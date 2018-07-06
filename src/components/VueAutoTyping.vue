<template>
    <span :data-cursor="cursor" :class="[cursor && showCursor?'auto-typing--cursor':'auto-typing']">
        <span v-if="split">
            <span v-for="(char, index) in text" :key="index">{{char}}</span>
        </span>
        <span v-else>{{text}}</span>
    </span>
</template>

<script>
const timeout = (t) => new Promise((resolve)=>{setTimeout(()=>resolve(),t)});
export default {
    props:{
        delay:{
            type: Number,
            default: 0,
            required: false,
            validator: (n)=> n >= 0
        },
        speed:{
            type: Number,
            default: 250,
            required: false,
            validator: (n)=> n > 0
        },
        variance:{
            type: Number,
            default: 50,
            required: false,
            validator: (n)=> n >= 0
        },
        mode:{
            type: String,
            default: "human",
            required: false,
            validator: (s)=> ["human","linear"].includes(s)
        },
        auto:{
            type: Boolean,
            default: true,
            required: false
        },
        split:{
            type: Boolean,
            default: false,
            required: false
        },
        readtime:{
            type: Number,
            default: 1000,
            required: false,
            validator: (n)=> n > 0
        },
        cursor:{
            type: String,
            default: "|",
            required: false
        },
        keepCursor:{
            type: Boolean,
            default: false,
            required: false
        },
        loop:{
            type: Boolean,
            default: false,
            required: false
        },
    },
    data(){
        return{
            text: "",
            queue: [],
            index: 0,
            showCursor: true,
        }
    },
    computed:{
        current: {
            get(){ return this.queue.length > this.index ? this.queue[ this.index ] : ""; }
        }
    },
    methods:{
        start(){
            let delay = async()=>{
                await timeout( this.delay );
                this.typing();
            };
            if( this.delay > 0 ){
                delay();
            }else{
                this.typing();
            }
        },
        push( str ){
            this.queue.push( String(str) );
        },
        async erasing(){
            for( let i=this.text.length; i>0; i-- ){
                this.text = this.text.substr(0,this.text.length-1);
                await timeout(100);
            }
        },
        async typing(){
            this.showCursor = this.cursor.length > 0;
            let wait = 0;
            for( let i=0; i < this.current.length; i++ ){
                wait = this.mode === "linear" ? this.speed : this.speed + (this.variance * Math.random());
                await timeout(wait);
                this.text += this.current[i];
            }
            await timeout( this.readtime );
            if( this.index < this.queue.length - 1 ){
                await this.erasing();
                this.index += 1;
                this.typing();
            }else if( this.loop ){
                await this.erasing();
                this.index = 0;
                this.typing();
            }else{
                this.showCursor = this.keepCursor;
            }
        }
    },
    mounted(){
        let content = this.$slots.default;
        let text = Array.isArray(content) && content.length > 0 ? content[0].text : "";
        this.queue.unshift( text );
        console.log(`queue ${this.queue.toString()}`);
        this.auto && this.start();
    }
}
</script>
<style>
.auto-typing--cursor::after{
    content: attr(data-cursor);
    display: inline;
    -webkit-animation: cursor-blink 0.7s infinite;
    -moz-animation: cursor-blink 0.7s infinite;
    animation: cursor-blink 0.7s infinite;
}
@keyframes cursor-blink {
    from{
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}
</style>