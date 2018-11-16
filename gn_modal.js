class Gn_modal{
    
    constructor(){
        
        /**
         * atributos para manipulacao do modal
         */
        this.modal      = document.getElementById('gn_modal');
        this.title      = document.getElementById('title-box');
        this.message    = document.getElementById('desc-box');
        this.controller = document.getElementById('box-controller');
        this.mainBox    = document.getElementById('main-box');
        this.overlay    = document.getElementById('overlay-box');
        
        
        /**
         * Set defaults values to de modal box
         */
        this.default = { 
            title      :'type atitle',
            message    :'type a description',
            type       :'info',
            svg        : '<svg viewBox="0 0 256 512"><path fill="currentColor" d="M224 352.589V224c0-16.475-6.258-31.517-16.521-42.872C225.905 161.14 236 135.346 236 108 236 48.313 187.697 0 128 0 68.313 0 20 48.303 20 108c0 20.882 5.886 40.859 16.874 58.037C15.107 176.264 0 198.401 0 224v39.314c0 23.641 12.884 44.329 32 55.411v33.864C12.884 363.671 0 384.359 0 408v40c0 35.29 28.71 64 64 64h128c35.29 0 64-28.71 64-64v-40c0-23.641-12.884-44.329-32-55.411zM128 48c33.137 0 60 26.863 60 60s-26.863 60-60 60-60-26.863-60-60 26.863-60 60-60zm80 400c0 8.836-7.164 16-16 16H64c-8.836 0-16-7.164-16-16v-40c0-8.836 7.164-16 16-16h16V279.314H64c-8.836 0-16-7.164-16-16V224c0-8.836 7.164-16 16-16h96c8.836 0 16 7.164 16 16v168h16c8.836 0 16 7.164 16 16v40z" class=""></path></svg>',
            buttons    :{
                cancel  : ()=>{ this.dismiss();}
            },
            addClass    : '',
            overlay     :  {
                opacity:'0.5',
            },
            escape: false,
            animation : { has:true},
            pressEsc  : true,
            
        };
        
        this.initPrototype();
        
        
    }
    /**
     * Funcao que cria todos os elementos e atributos do modal
     * 
     * @param {object} value objeto com novos valores a serem definidos no modal
     */
    create(value){
        
        // limpa tudo antes de receber os novos valores
        this.removeAllChild(this.title,this.message,this.controller);
        
        
        // define as configuracoes padrao
        this.defaultSetting =   this.setSettings(value);
        
        // adiciona a classe ao main-box
        this.mainBox.addClasses(`${this.defaultSetting.type}`);
        
        // Checa se a propriedade addclass nao foi declarar
        this.defaultSetting.addClass != ''?
            this.modal.addClasses(`${this.defaultSetting.addClass}`) 
        :'' ;
        
        // aplica o estilo css no overlay
        this.overlay.css(this.defaultSetting.overlay);
        
        // Criando titulo
        this.title.append( this.createNewElement('h3',`${this.defaultSetting.title}`));  
        
        //Crinado o icone
        let icon = this.createNewElement('span');
        icon.id = 'icon';
        icon.addClasses(this.defaultSetting.type);
        icon.innerHTML = this.defaultSetting.svg;
        this.title.append(icon);  
        
        // Crinado descricao
        this.message.append(this.createNewElement('p',`${this.defaultSetting.message}`));
        
        //Criando os botoes
        let button = [];
        for (button  in this.defaultSetting.buttons){
            this.controller.append( this.createNewElement('button',`${button}`)) 
        }  
        
        
        // Adciona o evento click no overlay
        this.overlay.addEventListener('click',(e)=>{
            this.escape();        
        });
        
        
        // Por fim mostra o modal gerado
        this.modal.show();
        this.initKeybordEvents();
    }
    
    initKeybordEvents(){
        
        if(this.modal.style.display == 'flex' && this.defaultSetting.pressEsc === true){
            document.addEventListener('keyup',this.escKeyup.bind(this),{once:true})
        }
        
    }
    
    
    escKeyup(e){
        document.removeEventListener('keyup',this.escKeyup,{once:true})
        
        if(e.keyCode === 27){
            this.escape();
        }
    }
    
    escape(){
        
        if(this.defaultSetting.escape == true){
            this.dismiss();
        }else{
            
            this.mainBox.removeClasses('swing').delay(100).then(()=>{
                this.mainBox.addClasses('swing');
            });
        }
        
    }
    
    
    /**
     *  Funcao para criar tag html para o DOM
     * 
     * @param {String} elm           Tag html que deseja criar
     * @param {String} innerText     texto que ira dentro da nova tag
     * @returns {newElement}         Novo elemento criado
     */
    createNewElement( elm , innerText = '' ){ 
        let newElement = document.createElement(`${elm}`);
        newElement.innerHTML = `${innerText}`;
        
        if(elm === 'button'){
            newElement.dataset.fn = `${innerText}`;
            this.addEventsButtons(newElement);
        }
        return newElement;
    }
    
    /**
     *  Funcao para adicionar eventos de click nos botoes
     * 
     * @param {Element} button Elemento button html
     */
    addEventsButtons(button){  
        button.addEventListener('click',this.defaultSetting.buttons[button.dataset.fn]);  
    }
    /**
     * Funcao para atribuir valores entre as configuracoes padrao e as novas configuracoes
     * @param {object} newSettings  Objeto com as novas configuracoes
     * @returns {Object.assign}     Objeto de atribuicao
     * 
     */
    setSettings(newSettings){
    
        if(newSettings instanceof Object){
            return Object.assign({}, this.default ,newSettings );
        }else{
            console.error('Valores padroes atribuido a variavel, pois parametro passado nao era do tipo Object')
            return this.default;
        }
    }
    
    /**
     *  Funcao que dispensa o modal
     */
    dismiss(){
        
        if(this.defaultSetting.animation.has === true){
            
            this.mainBox.removeClasses('swing')
            this.modal.addClasses('fadeOut');
            this.mainBox.addClasses('fadeOutUp').delay(450)
                .then(()=>{
                    this.clearAll();
                    this.modal.hide(); 
                });
            
        } else {
            this.clearAll();
            this.modal.hide(); 
        }
    }
    
    /**
     * Funcao para limpar e zerar os dados do modal
     */
    clearAll(){
        
        this.removeAllChild(this.title,this.message,this.controller);
        this.modal.removeClasses('fadeOut');
        this.mainBox.removeClasses('fadeOutUp swing');
        
    }
    
    
    /**
     * 
     * Funcao para remover todos os Elementos filhos de um elemento
     * @param  {...Element} params  Elementos as serem limpados
     */
    removeAllChild(...params){
        
        params.forEach((param)=>{
            while (param.firstChild) param.removeChild(param.firstChild);
        }); 
    }
    
    /**
     * Funcao para iniciar o prototypes
     */
    initPrototype(){
        
        
        Element.prototype.show = function(){
            this.style.display = 'flex';
            return this;
        }
        Element.prototype.addClasses = function(classes){
            
            let _class = classes.split(' ')
            for (let name in _class){
                this.classList.add(_class[name]);
            }
            return this;
        }
        Element.prototype.removeClasses = function(classes){
            
            let _class = classes.split(' ')
            for (let name in _class){
                this.classList.remove(_class[name]);
            }
            return this;
        }
        
        Element.prototype.hide = function(){
            
            this.style.display = 'none';
            return this;
        }
        
        Element.prototype.css = function(styles){
            for(let name in styles){
                let value =  styles[name]
                this.style[name] = value;
            }
            return this;
            
        }
        
        Element.prototype.delay = function(time){
            return new Promise((resolve, reject)=>{
                setTimeout(() => {
                    resolve(true);
                }, time);
            });
        }
        
    }   
}




