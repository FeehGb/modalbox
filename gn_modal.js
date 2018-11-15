class Gn_modal{
    
    constructor(){
        
        /**
         * atributos para manipulacao do modal
         */
        this.modal      = document.getElementById('gn_modal');
        this.title      = document.getElementById('title-box');
        this.message    = document.getElementById('desc-box');
        this.controller = document.getElementById('box-controller')
        this.mainBox    = document.getElementById('main-box')
        
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
        this.defaultSetting =   this.settings(value);
        
        // adiciona a classe ao main-box
        this.mainBox.classList  .add(`${this.defaultSetting.type}`);
        
        // Checa se a propriedade addclass foi declarar
        this.defaultSetting.addClass != ''?
            this.modal.classList.add(`${this.defaultSetting.addClass}`) 
        :'' ;
    
        // Criando titulo
        this.title.append( this.createNewElement('h3',`${this.defaultSetting.title}`));  
        
        // Crinado descricao
        this.message.append(this.createNewElement('p',`${this.defaultSetting.message}`));
        
        //Criando os botoes
        let button = [];
        for (button  in this.defaultSetting.buttons){
            this.controller.append( this.createNewElement('button',`${button}`)) 
        }  
        
        this.modal.show();
    }
    
    
    /**
     *  Funcao para criar tag html para o DOM
     * 
     * @param {String} elm          // Tag html que deseja criar
     * @param {String} innerText    // texto que ira dentro da nova tag
     * @returns {newElement}        // Novo elemento criado
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
     * @param {Element} button //Elemento button html
     */
    addEventsButtons(button){  
        button.addEventListener('click',this.defaultSetting.buttons[button.dataset.fn]);  
    }
    /**
     * Funcao para atribuir valores entre as padrao
     * e as novas configuracoes
     * 
     * @param {object} newSettings  //objeto com as novas configuracoes
     * @returns {Object.assign}     // Objeto de atribuicao
     * 
     */
    settings(newSettings){
    
        if(newSettings instanceof Object){
            return Object.assign({}, this.default, newSettings );
        }else{
            console.error('Valores padroes atribuido a variavel, pois parametro passado nao era do tipo Object')
            return this.default;
        }
    }
    
    /**
     *  Funcao que dispensa e limpa o modal
     */
    dismiss(){

        this.modal.hide();
        this.removeAllChild(this.title,this.message,this.controller);
        
    }
    
    removeAllChild(...params){
        
        params.forEach((param)=>{
            while (param.firstChild) param.removeChild(param.firstChild);
        }); 
    }
    
    
    initPrototype(){
        
        Element.prototype.show = function(){
            this.style.display = 'flex';
        }
        
        
        Element.prototype.hide = function(){
            this.style.display = 'none';
        }
        
        
    }
    
    
}





