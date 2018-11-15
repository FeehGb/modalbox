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
            buttons    :{
                cancel  : ()=>{ this.dismiss();}
            },
            addClass    : '',
            overlay     :  {
                opacity:'0.5',
            },
        };
        
        this.fixedDefault = {
            animation : { has:true}
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
        this.mainBox.classList  .add(`${this.defaultSetting.type}`);
        
        // Checa se a propriedade addclass nao foi declarar
        this.defaultSetting.addClass != ''?
            this.modal.addClasses(`${this.defaultSetting.addClass}`) 
        :'' ;
        
        // aplica o estilo css no overlay
        this.overlay.css(this.defaultSetting.overlay);
        
        // Criando titulo
        this.title.append( this.createNewElement('h3',`${this.defaultSetting.title}`));  
        
        // Crinado descricao
        this.message.append(this.createNewElement('p',`${this.defaultSetting.message}`));
        
        //Criando os botoes
        let button = [];
        for (button  in this.defaultSetting.buttons){
            this.controller.append( this.createNewElement('button',`${button}`)) 
        }  
        // Por fim mostra o modal gerado
        this.modal.show();
    }
    
    /**
     *  Funcao para criar tag html para o DOM
     * 
     * @param {String} elm           Tag html que deseja criar
     * @param {String} innerText     texto que ira dentro da nova tag
     * @returns {newElement}         Novo elemento criado
     */
    createNewElement( elm , innerText ){ 
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
            return Object.assign({}, this.default, this.fixedDefault ,newSettings );
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
            
            this.modal.classList.add('fadeOut');
            this.mainBox.classList.add('fadeOutUp')
            
            setTimeout(()=>{
                
                this.clearAll();
                this.modal.hide(); 
                
            },450);
            
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
        this.modal.classList.remove('fadeOut');
        this.mainBox.classList.remove('fadeOutUp');
        
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
     * Funcao para iniciar o prototype
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
        
    }   
}