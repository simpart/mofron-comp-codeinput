/**
 * @file mofron-comp-codeinput/index.js
 * @brief code input component for mofron
 * @license MIT
 */
const Input     = require('mofron-comp-input');
const loMargin  = require('mofron-layout-margin');
const Key       = require('mofron-event-key');
const ConfArg   = mofron.class.ConfArg;
const comutl    = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("CodeInput");
	    this.shortForm("digits");
            
	    /* init config */
            this.confmng().add('digits', { type:'number', init:0 });
            this.confmng().add('mainColor', { type:'color' });
	    this.confmng().add('codeEvent', { type:'event', list:true })
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
	    this.style({
                'display': 'flex'
	    });
            this.digits(6);
            
            //let txt_area = new mofron.class.Component();
	    //this.child(txt_area);

	    this.layout([
                new loMargin('left', '0.2rem')
	    ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    text (prm) {
        try {
            
	} catch (e) {                        
            console.error(e.stack);
            throw e; 
        }
    }

    codeEvent (fnc,prm) {
        try {
            return this.confmng(
                       'codeEvent',
                       (undefined === fnc) ? undefined : [fnc,prm]
                   );
	} catch (e) {             
            console.error(e.stack);
            throw e;          
        } 
    }
    
    keyEvent (p1,p2,p3) {
        try {
	    if ( ('Backspace' === p2) ||
	         ('Enter' === p2) ||
		 (0 === p2.indexOf('Arrow')) ) {
                return;
	    }
	    let inp_lst   = p3.getInput();
	    let focus_idx = 0;
            let code_lst  = [];
	    for (let idx in inp_lst) {
                if (inp_lst[idx].id() === p1.id()) {
                    focus_idx = parseInt(idx);
		}
                code_lst.push(inp_lst[idx].value());
	    }
	    if (focus_idx < (inp_lst.length-1)) {
                inp_lst[focus_idx+1].focus(true);
		return;
	    }
            let code_evt = p3.codeEvent();
            for (let cidx in code_evt) {
                code_evt[cidx][0](p3, code_lst, code_evt[cidx][1]);
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    value () {
        try {
            let inp_lst  = this.getInput();
            let ret_code = '';
            for (let idx in inp_lst) {
	        if (null === inp_lst[idx].value()) {
                    continue;
		}
                ret_code += inp_lst[idx].value();
            }
            return ret_code;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    reset () {
        try {
            let inp = this.getInput();
            for (let idx in inp) {
                inp[idx].value("");
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    afterRender () {
        try {
            super.afterRender();
            let inp_cnt = this.digits();
            for (let inp_idx=0;inp_idx < inp_cnt;inp_idx++) {
	        let set_inp = new Input({
                                  width:  '0.4rem', height: '0.6rem',
                                  style:  { 'text-align':'center' },
				  event: new Key({
				             listener: new ConfArg(this.keyEvent,this),
					     type: 'keyup'
					 })
                              });
                this.child(set_inp);
                if (null !== this.mainColor()) {
                    set_inp.accentColor(this.mainColor());
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    getInput (prm) {
        try {
            let chd = this.child();
            let ret     = [];
            for (let cidx in chd) {
                if (true === comutl.isinc(chd[cidx],'Input')){
                    ret.push(chd[cidx]);
		}
            }
	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    digits (prm) {
        try {
            return this.confmng("digits", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    marginLeft (prm) {
        try {
            return this.layout({ modname:'Margin' }).value(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    mainColor (prm, opt) {
        try {
	    return this.confmng("mainColor", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    width (prm,opt) {
        try {
            let inp_lst = this.getInput();
	    for (let idx in inp_lst) {
                inp_lst[idx].width(prm,opt);
	    }
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    height (prm,opt) {
        try {
            let inp_lst = this.getInput();
            for (let idx in inp_lst) {
                inp_lst[idx].height(prm,opt);
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
