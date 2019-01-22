class Modal {
    
    constructor() {
        
        /**
         * atributos para manipulacao do Dialog
         */
        this.modal          = document.getElementById('_modal'        );
        this._title          = document.getElementById('title-box'     );
        this.message        = document.getElementById('desc-box'      );
        this.controller     = document.getElementById('box-controller');
        this.mainBox        = document.getElementById('main-box'      );
        this.overlay        = document.getElementById('overlay-box'   );
        
        /**
         * Set defaults values to de modal box
         */
        
        this.default = {
            title: 'type atitle',
            message: 'type a description',
            type: 'default',
            svg: '',
            buttons: [
                {
                    text: 'Cancelar',
                    over: 'cancel',
                    handler: () => {
                        this.dismiss();
                        console.log('Cancel clicked');
                    }
                }
            ],
            addClass: '',
            overlay: {
                opacity: '0.5',
            },
            escape: false,
            animation: {
                escape: 'swing',
                dismiss: 'fadeOutUp'
        
            },
            pressEsc: false,
        };
        
        
        
        this.initPrototype();
        
        
    }
    /**
     * Funcao que cria todos os elementos e atributos do modal
     * 
     * @param {object} value objeto com novos valores a serem definidos no modal
     */
    create(setting) {
        
        // limpa tudo antes de receber os novos valores
        //this.removeAllChild(this._title,this.message,this.controller);
        
        // define as configuracoes padrao
        this.userSetting = this.extend(this.default,setting);
        
        console.log(this.userSetting);
        console.log(this.default);
        
        
        // adiciona a classe ao main-box
        this.mainBox.addClasses(`${this.userSetting.type}`);
        
        // Checa se a propriedade addclass nao foi declarar
        this.userSetting.addClass != '' ?
            this.modal.addClasses(`${this.userSetting.addClass}`) : '';
            
        // aplica o estilo css no overlay
        this.overlay.css(this.userSetting.overlay);
        
        // Criando titulo
        this._title.append(this.createNewElement('h3', `${this.userSetting.title}`));
        
        //Crinado o icone
        let icon = this.createNewElement('span');
        icon.id = 'icon';
        icon.addClasses(this.userSetting.type);
        icon.innerHTML = (this.userSetting.svg.replace(/(<svg\s)[^]*(viewBox="[\s\d]*")[^>]*(.*)/g,'$1$2$3'));
        this._title.append(icon);
        
        
        //criando close button top left
        let btnData = [{
            text:' ',
            handler: () => {
                this.dismiss();
                console.log('Cancel clicked');
            },
            class:'close',
            svg:'<svg aria-hidden="true" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-3x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>'
        }]
        this.createButtons(btnData,this._title);
        
        
        
        
        // Crinado descricao
        this.message.append(this.createNewElement('p', `${this.userSetting.message}`));
        
        //Criando os botoes footer
        
        this.createButtons(this.userSetting.buttons,this.controller);
        
        // Adciona o evento click no overlay
        this.overlay.addEventListener('click', (e) => {
            this.escape();
        });
        
        // Por fim mostra o modal gerado
        this.modal.show();
        this.initKeybordEvents();
    }
    
    initKeybordEvents() {
        
        if (this.modal.style.display == 'flex' && this.userSetting.pressEsc === true) {
            document.addEventListener('keyup', this.escKeyup.bind(this))
        }
        
    }
    
    escKeyup(e) {
        
        document.removeEventListener('keyup', this.escKeyup.bind(this));
        
        if (e.keyCode === 27 && this.userSetting.pressEsc === true) {
            console.log(e)
            this.escape();
        }
    }
    
    escape() {
        if (this.userSetting.escape == true) {
            this.dismiss();
        } else {
            
            this.mainBox.removeClasses(this.userSetting.animation.escape)
            .delay(100)
            .then(() => {
                this.mainBox.addClasses(this.userSetting.animation.escape);
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
    createNewElement(elm, data = '') {
        let newElement = document.createElement(`${elm}`);
        

        switch(elm){
            case 'button':
                newElement.innerHTML = `${data.text || 'Click-me'}`;
                if(data.svg){
                    newElement.innerHTML += `${data.svg.replace(/(<svg\s)[^]*(viewBox="[\s\d]*")[^>]*(.*)/g,'$1$2$3')}`;
                }
                newElement.title = `${data.over ||''}`;
                newElement.type = `button`;
                newElement.classList.add(`${data.class ||'button'}`);
                this.addEventsButtons(newElement,data.handler);
            break
            default:
                newElement.innerHTML = `${data}`;
            break
        }
        
        
        
        
        return newElement;
    }
    
    createButtons(data, target){
        
        let buttons = [];
        data.forEach((info) => {
            buttons.push(this.createNewElement('button', info));
        })
        
        buttons.forEach((button) =>{
            target.append(button);
        })
    }
    
    
    
    /**
     *  Funcao para adicionar eventos de click nos botoes
     * 
     * @param {Element} button Elemento button html
     */
    addEventsButtons(button,handler) {
        //debugger;
        button.addEventListener('click', handler);
    }
    
    /**
     * Funcao para atribuir valores entre as configuracoes padrao e as novas configuracoes
     * @returns {extended} Objeto com as configuraçoes unidas
     * 
     */
    extend(){
        
        let i = 0;
        let length = arguments.length;
        

        let extended = {};
        // Loop through each object and conduct a merge
        for ( ; i < length; i++ ) {
            let  obj = arguments[i];
            for ( let prop in obj ) {
                if ( ({}).hasOwnProperty.call( obj, prop ) ) {
                    // If deep merge and property is an object, merge properties
                    if ( Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                        extended[prop] = this.extend( extended[prop], obj[prop] );
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        }
        
        return extended;
        
    }
    
    /**
     * Funcao para atribuir valores entre as configuracoes padrao e as novas configuracoes
     * @param {object} newSettings  Objeto com as novas configuracoes
     * @returns {Object.assign}     Objeto de atribuicao
     * 
     */
    setSettings(newSettings) {
        
        
        //return this.extend(this.default,newSettings);
        
       /*  let  extended = {};
        var prop;
        for (prop in this.default) {
            if (Object.prototype.hasOwnProperty.call(this.default, prop)) {
                extended[prop] = this.default[prop];
            }
        }
        for (prop in newSettings) {
            if (Object.prototype.hasOwnProperty.call(newSettings, prop)) {
                extended[prop] = newSettings[prop];
            }
        }
        return extended; */
        
       /*  debugger;
        if (newSettings instanceof Object) {
            
            return Object.assign({}, this.default, newSettings);
        } else {
            //console.log('Valores padroes atribuido a variavel, pois parametro passado nao era do tipo Object')
            return this.default;
        } */
    }
    
    /**
     *  Funcao que dispensa o modal
     */
    dismiss() {
        
        this.mainBox.removeClasses(this.userSetting.animation.escape);
        this.modal.addClasses('fadeOut');
        this.mainBox.addClasses(this.userSetting.animation.dismiss)
            .delay(450)
                .then(() => {
                    this.destroy();
                    this.modal.hide();
                })
            ;
            
        
    }
    
    /**
     * Funcao para limpar e zerar os dados do modal
     */
    destroy() {
        
        this.removeAllChild(this._title, this.message, this.controller);
        this.modal.removeClasses('fadeOut');
        this.mainBox.removeClasses(`${this.userSetting.animation.dismiss} ${this.userSetting.animation.escape} ${this.userSetting.type}`);
        
    }
    
    
    /**
     * 
     * Funcao para remover todos os Elementos filhos de um elemento
     * @param  {...Element} params  Elementos as serem limpados
     */
    removeAllChild(...params) {
        
        params.forEach((param) => {
            while (param.firstChild) param.removeChild(param.firstChild);
        });
    }
    
    /**
     * Funcao para iniciar o prototypes
     */
    initPrototype() {
        
        
        Element.prototype.show = function() {
            this.style.display = 'flex';
            return this;
        }
        Element.prototype.addClasses = function(classes) {
            
            let _class = classes.split(' ')
            for (let name in _class) {
                this.classList.add(_class[name]);
            }
            return this;
        }
        Element.prototype.removeClasses = function(classes) {
            
            let _class = classes.split(' ')
            for (let name in _class) {
                this.classList.remove(_class[name]);
            }
            return this;
        }
        
        Element.prototype.hide = function() {
            
            this.style.display = 'none';
            return this;
        }
        
        Element.prototype.css = function(styles) {
            for (let name in styles) {
                let value = styles[name]
                this.style[name] = value;
            }
            return this;
            
        }
        
        Element.prototype.delay = function(time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                    return this;
                }, time);
            });
        }
        
        
    }
}