new Vue({

    // 根Dom元素的Css选择器
    el: '#notebook',

    // 一些数据
    data(){
        return{
            content: 'This is a note',
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            // 选中笔记的ID
            selectedId: localStorage.getItem('selected-id') || null,
        }
    },

    // 计算属性
    computed: {
        notePreview(){
            // MarkDown 渲染为HTML
            // return marked(this.content)
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },
        selectedNote(){
            // 返回与selectedId匹配怼笔记
            console.log(this.notes.find(note => note.id === this.selectedId))
            return this.notes.find(note => note.id === this.selectedId)
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
        },
        // content: {
        //     handler: 'saveNote'
        // }
        // content: 'saveNote'
        notes: {
            // 方法名
            handler: 'saveNotes',
            deep: true
        },
        // 保存选中项
        selectedId(val){
            localStorage.setItem('selected-id', val)
        }
    },

    // 方法
    methods: {
        saveNotes(val){
            // 在存储之前不要忘记把对象转换为JSON字符串
            localStorage.setItem('notes',JSON.stringify(this.notes))
            console.log('Notes saved!', new Date())
        },
        // 用一些默认值添加一条笔记，并将其添加到笔记数组中
        addNote(){
            const time = Date.now()

            //  新笔记怼默认值
            const note = {
                id: String(time),
                title: 'New note' + (this.notes.length + 1),
                content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favorite: false,
            }
            //  添加到列表中
            this.notes.push(note)
        },
        selectNote(note){
            this.selectedId =  note.id
        },
        removeNote(){
            if(this.selectedNote && confirm('Delete the note?')){
                // 将选中的笔记从笔记列表中移除
                const index = this.notes.indexOf(this.selectedNote)
                if(index !== -1){
                    this.notes.splice(index,1)
                }
            }
        },
        favoriteNote(){
            
        }
    },

    // 当实例准备就绪会调用这个钩子
    created(){
        // 将content设置为存储的内容
        // 如果没有保存任何内容则设置为一个默认字符串
        this.content = localStorage.getItem('content') || 'You can write in markdown'
    }
})