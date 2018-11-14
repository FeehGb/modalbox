class Gn_modal{
    
    constructor(){
        
        this.modal      = document.getElementById('gn_modal');
        this.title      = this.modal.querySelector('.title-box');
        this.message    = this.modal.querySelector('.desc-box');
        this.controller = this.modal.querySelector('#box-controller')
        
        /**
         * Set defaults values to de modal box
         */
        this.default = { 
            title       :'Default title',
            message     :'Descricao da caixa de dialogo',
            type        :'info',
            buttons     :{
                confirm : ()=>{ console.log('confirm clicked')},
                cancel  : ()=>{ this.dismiss();}
            }
        };
    }
    
    create(value){
        
        this.defaultSetting =  this.settings(value);
        this.modal.classList.add(`${this.defaultSetting.type}`);
        
        //Criando titulo
        this.title.append( this.createNewElement('h3',`${this.defaultSetting.title}`));  
        
        //Crinado descricao
        this.message.append(this.createNewElement('p',`${this.defaultSetting.message}`));
        
        //Criando os botoes
        let button = [];
        for (button  in this.defaultSetting.buttons){
            
            this.controller.append( this.createNewElement('button',`${button}`)) 
            
            
        }  
        
    }
    
    createNewElement( elm , value ){
        
        let newElement = document.createElement(`${elm}`);
        newElement.innerHTML = `${value}`;
        
        if(elm === 'button'){
            newElement.dataset.fn = `${value}`;
            this.addEventsButtons(newElement);
        }
        
        return newElement;
        
    }
    
    addEventsButtons(button){
        
        button.addEventListener('click',this.defaultSetting.buttons[button.dataset.fn]);
        
    }
    
    settings(newSettings){
        
        return Object.assign({}, this.default, newSettings );
        
    }
    
    dismiss(){
        
        this.title.innerHTML = '';
        this.message.innerHTML = ''; 
        this.controller.innerHTML = '';
        
    }
}