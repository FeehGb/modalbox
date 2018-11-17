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
            svg        : '<svg aria-hidden="true" data-prefix="fas" data-icon="cloud-moon-rain" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-cloud-moon-rain fa-w-18 fa-9x"><path fill="currentColor" d="M350.5 225.5c-6.9-37.2-39.3-65.5-78.5-65.5-12.3 0-23.9 3-34.3 8-17.4-24.1-45.6-40-77.7-40-53 0-96 43-96 96 0 .5.2 1.1.2 1.6C27.6 232.9 0 265.2 0 304c0 44.2 35.8 80 80 80h256c44.2 0 80-35.8 80-80 0-39.2-28.2-71.7-65.5-78.5zm217.4-1.7c-70.4 13.3-135-40.3-135-110.8 0-40.6 21.9-78 57.5-98.1 5.5-3.1 4.1-11.4-2.1-12.5C479.6.8 470.7 0 461.8 0c-77.9 0-141.1 61.2-144.4 137.9 26.7 11.9 48.2 33.8 58.9 61.7 37.1 14.3 64 47.4 70.2 86.8 5.1.5 10 1.5 15.2 1.5 44.7 0 85.6-20.2 112.6-53.3 4.2-4.8-.2-12-6.4-10.8zM364.5 418.1c-7.6-4.3-17.4-1.8-21.8 6l-36.6 64c-4.4 7.7-1.7 17.4 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l36.6-64c4.3-7.7 1.7-17.4-6-21.8zm-96 0c-7.6-4.3-17.4-1.8-21.8 6l-36.6 64c-4.4 7.7-1.7 17.4 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l36.6-64c4.3-7.7 1.7-17.4-6-21.8zm-96 0c-7.6-4.3-17.4-1.8-21.8 6l-36.6 64c-4.4 7.7-1.7 17.4 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l36.6-64c4.3-7.7 1.7-17.4-6-21.8zm-96 0c-7.6-4.3-17.4-1.8-21.8 6l-36.6 64c-4.4 7.7-1.7 17.4 6 21.8 2.5 1.4 5.2 2.1 7.9 2.1 5.5 0 10.9-2.9 13.9-8.1l36.6-64c4.3-7.7 1.7-17.4-6-21.8z" class=""></path></svg>',
            buttons    :{
                cancel  : ()=>{ this.dismiss();}
            },
            addClass    : '',
            overlay     :  {
                opacity:'0.5',
            },
            escape: false,
            animation : { has:true},
            pressEsc  : false,
            
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
        //this.removeAllChild(this.title,this.message,this.controller);
        
        
        // define as configuracoes padrao
        this.userSetting =   this.setSettings(value);
        
        // adiciona a classe ao main-box
        this.mainBox.addClasses(`${this.userSetting.type}`);
        
        // Checa se a propriedade addclass nao foi declarar
        this.userSetting.addClass != ''?
            this.modal.addClasses(`${this.userSetting.addClass}`) 
        :'' ;
        
        // aplica o estilo css no overlay
        this.overlay.css(this.userSetting.overlay);
        
        // Criando titulo
        this.title.append( this.createNewElement('h3',`${this.userSetting.title}`));  
        
        //Crinado o icone
        let icon = this.createNewElement('span');
        icon.id = 'icon';
        icon.addClasses(this.userSetting.type);
        icon.innerHTML = (this.userSetting.svg);
        this.title.append(icon);  
        
        // Crinado descricao
        this.message.append(this.createNewElement('p',`${this.userSetting.message}`));
        
        //Criando os botoes
        let button = [];
        for (button  in this.userSetting.buttons){
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
        
        if(this.modal.style.display == 'flex' && this.userSetting.pressEsc === true){
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
        
        if(this.userSetting.escape == true){
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
        button.addEventListener('click',this.userSetting.buttons[button.dataset.fn]);  
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
            console.log('Valores padroes atribuido a variavel, pois parametro passado nao era do tipo Object')
            return this.default;
        }
    }
    
    /**
     *  Funcao que dispensa o modal
     */
    dismiss(){
        
        if(this.userSetting.animation.has === true){
            
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
                    return this;
                }, time);
            });
            
        }
        
    }   
}




