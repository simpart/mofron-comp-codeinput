/**
 * @file mofron-comp-mcarousel/index.js
 * @brief mobile carousel component for mofron
 * @license MIT
 */
const Text    = require('mofron-comp-text');
const Input   = require('mofron-comp-input');
const Line    = require('mofron-comp-line');
const comutl  = mofron.util.common;
const ConfArg = mofron.class.ConfArg;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("CodeInput");
            this.shortForm('digits');
            
	    /* init config */
            this.confmng().add('digits', { type:'number', init:0 });
            this.confmng().add('left', { type:'size', init:'0.1rem' });
            
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
            let inp_area = new mofron.class.Component({
                               style: { 'display':'flex' }
                           });
            this.child([inp_area, this.keyboard()]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    keyboard (prm) {
        try {
	    if (undefined !== prm) {
                prm.config({
                   size:  new ConfArg('100%','40%'),
		   style: {
		       'position':  'fixed',
		       'bottom':    '0rem'
		   },
		   //child: 
		   baseColor: [240,240,240],
		   visible: false
		});
	    }
            return this.innerComp('keyboard', prm, mofron.class.Component);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    beforeRender () {
        try {
	    let inp = new mofron.class.Component({
	                  size:  new ConfArg('0.3rem', '0.6rem'),
                          child: [ new Text(), new Line('100%') ],
			  style: { 'margin-left': this.left() }
	              });

            for (let idx=0;idx < this.digits(); idx++) {
                this.child()[0].child(inp);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    left (prm) {
        try {
            return this.confmng('left',prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    digits (prm) {
        try {
            return this.confmng('digits',prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    mainColor (prm, opt) {
        try {
            return this.keyboard().baseColor(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
