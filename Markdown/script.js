new Vue({

    // 根Dom元素的Css选择器
    el: '#notebook',

    // 一些数据
    data(){
        return{
            content: 'This is a note'
        }
    },

    // 计算属性
    computed: {
        notePreview(){
            // MarkDown 渲染为HTML
            return marked(this.content)
        }
    },

    // 侦听器
    watch: {
        //  侦听content数据属性
        // content:{
        //     handler(val, oldVal){
        //         console.log('new note', val, 'old note', oldVal)
        //     },
        //     代表watch里声明了firstName这个方法之后立即先去执行handler方法
        //     immediate: true
        // }
        content(val, oldVal){
            console.log('new note', val, 'old note', oldVal)
            localStorage.setItem('content', this.content)
        }
        // content: {
        //     handler: 'saveNote'
        // }
        // content: 'saveNote'
    },

    // 方法
    methods: {
        saveNote(val){
            console.log('saving note', val)
            localStorage.setItem('content', this.content)
        }
    },

    // 当实例准备就绪会调用这个钩子
    created(){
        // 将content设置为存储的内容
        // 如果没有保存任何内容则设置为一个默认字符串
        this.content = localStorage.getItem('content') || 'You can write in markdown'
    }
})