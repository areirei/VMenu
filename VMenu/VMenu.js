Vue.component('v-menu', {
    template: `<div class="v_pre">
                <div class="v_pre_hd">
                    <strong class="title">微信公众账号</strong>
                </div>
                <div class="v_pre_bd"></div>
                <div class="v_pre_ft">
                    <ul class="pre_menu_list clearfix">
                        <li class="pre_menu_item grid_item" v-for="btn in btns">
                            <a class="pre_menu_link" @click="triggerActive(btn)" :class="actItem==btn?'active':''">
                                <span v-text="btn.name"></span>
                            </a>
                            <div class="sub_pre_menu_box">
                                <ul class="sub_pre_menu_list no-margin">
                                    <li v-for="sub in btn.sub_btn">
                                        <a @click="triggerActive(btn,sub)" v-text="sub.name" :class="actItem==sub?'active':''"></a>
                                    </li>
                                    <li v-show="!btn.sub_btn||btn.sub_btn.length<5">
                                        <a @click="addSub(btn)">+</a>
                                    </li>
                                </ul>
                                <i class="arrow arrow_out"></i>
                                <i class="arrow arrow_in"></i>
                            </div>
                        </li>
                        <li class="pre_menu_item grid_item" v-if="btns.length<3">
                            <a @click="addBtn" class="pre_menu_link"><span>+</span></a>
                        </li>
                    </ul>
                </div>
            </div>`,
    props: ['buttons','activeBtn','activeItem'],
    data:function(){
        return{
            btns:this.buttons,
            actBtn:this.activeBtn,
            actItem:this.activeItem
        }
    },
    methods: {
        triggerActive:function(btn,sub){
            this.actBtn=btn;
            this.actItem=sub?sub:btn;
            this.$emit('update:buttons', this.btns);
            this.$emit('update:activeBtn', this.actBtn);
            this.$emit('update:activeItem', this.actItem);
        },
        addSub:function(btn){
            var length=btn.sub_btn?btn.sub_btn.length:1;
            !btn.sub_btn&&(btn.sub_btn=[]);
            length<5&&btn.sub_btn.push({name:'子菜单名称',type:'view',url:'',key:''});
            this.triggerActive(btn,btn.sub_btn[length-1]);
        },
        addBtn:function(){
            this.btns.length<3&&this.btns.push({name:'菜单名称',type:'view',url:'',key:'',sub_btn:[]});
            this.triggerActive(this.btns[this.btns.length-1]);
        },
    },
});