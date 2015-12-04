var React = require('react');
var classSet = require('classnames');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');


var data=[
        {
          title:{text:'Introduction',href:''},
          cont:[
             {text:'1.1. Student Portal Overview',href:''},
             {text:'1.2. Technical Support',href:''}
          ],
          context:{
             title:'page1',
             text:'This is an example of a tab template!'
          }
        },
        {
          title:{text:'Access',href:''},
          cont:[],
          context:{
             title:'page2',
             text:'This is an example of a tab template!'
          }
        },
        {
          title:{text:'Student Portal Testing History View',href:''},
          cont:[
             {text:'3.1. Student Portal Overview',href:''},
             {text:'3.2. Technical Support',href:''}
          ],
          context:{
             title:'page3',
             text:'This is an example of a tab template!'
          }
        },
        {
          title:{text:'Detailed Test View: Student Reports',href:''},
          cont:[
             {
                 title:{text:'4.1. STAAR 3-8 and EOC',href:''},
                 cont:[
                     {text:'A. Student Details and Scale Score Comparison',href:''},
                     {text:'B. Student Details and Scale Score Comparison',href:''},
                 ]
              },
             {
                 title:{text:'4.2. STAAR Alternate and Alternate 2',href:''},
                 cont:[
                     {text:'A. Student Details and Scale Score Comparison',href:''},
                     {text:'B. Student Details and Scale Score Comparison',href:''},
                 ]
              },
              {
                 title:{text:'4.3. TELPAS',href:''},
                 cont:[
                     {text:'A. Student Details and Scale Score Comparison',href:''},
                     {text:'B. Student Details and Scale Score Comparison',href:''},
                 ]
              },
          ],
          context:{
             title:'page4',
             text:'Tabs are also controllable if you want to programmatically pass them their values. This allows for more functionality in Tabs such as not having any Tab selected or assigning them different values!'
          }
        },
     ];

var TabSelect = React.createClass({

    getInitialState: function(){
    	return {
         _index : 0 ,
         hover: null
      }
    },

	render: function(){
		return (
       <div className="tab-layout">
           <div className="tab-title clearfix_1 s0">
              <ul>
                {data.map((v,i) => {
                     var li = 'li' + i + ' ' + 'tabMenuLis';
                     i == this.state.hover ? li += ' on' : '';
                     return (
                         <li className={li} key={i} data-i={i} onMouseEnter={this.onMouseShowMenu.bind(this,i)}   onMouseLeave={this.onMouseHideMenu.bind(this,i)}>
                            <span onClick={this.onClickTabChange} className="lh30 show w100">
                                {v.title.text}
                            </span>
                            {this.tabMenus(v.cont)}
                            
                         </li>
                     )
                  })}
              </ul>
           </div>
           <div className="tab-body">
              {
                data.map((v,i) => {
                   var tName;
                   i == this.state._index ? tName = 'on tabsContext' : tName = 'tabsContext';
                   return (
                        <div key={i} className={tName}>
                            <h1>{v.context.title}</h1>
                            <p>{v.context.text}</p>
                        </div>
                   )
                })
              }
           </div>
       </div>
    )
	},

  onClickTabChange: function(e){
    e.preventDefault();
    var index = e.target.parentNode.getAttribute('data-i');
    var par = e.target.parentNode.parentNode.parentNode;
    var cName = 's' + index;
    par.className = 'tab-title clearfix_1' + ' ' + cName;
    this.setState({_index:index});
  },

  tabMenus: function(data){
    var arr = [];
    data ? data.map((v,i) => {
        if(v.title){
          
          arr.push(v.title);
          v.cont.map((t,i) => {
             t.text = '  ' + t.text;
             t.indent = 2;
             t.hover = true;
             arr.push(t);
          })
        }else{
          v.hover = true;
          arr.push(v);
        }
        
    }) : '';
    var html =  (
       <ul className="tabMenuUls">
          {
            arr.map((v,i) => {
               var text = '';
               v.indent ? text += 'textIndent-2em' : text = '';
               v.hover ? text += ' hover' : '';
               return <li data-href={v.href} className={text}>{v.text}</li>;
            })
          }
       </ul>
    )
    return arr.length >= 1 ? html : '';
  },

  onMouseShowMenu: function(i,e){
    // console.log(i)
    // var li;
    // e.target.className.indexOf('tabMenuLis') <= -1 ? li = e.target.parentNode : '';
    // e.target.parentNode.className.indexOf('tabMenuUls') > -1 ? li = e.target.parentNode.parentNode : '';
    // var oldClass = li.className;
    // oldClass.indexOf('on') > -1 ? '' : li.className = oldClass +' on';
    this.setState({hover:i})
    e.stopPropagation();
  },

  onMouseHideMenu: function(i,e){
    // var li;
    // e.target.className.indexOf('tabMenuLis') > -1 ? '' : li = e.target.parentNode ;
    // e.target.parentNode.className.indexOf('tabMenuUls') > -1 ? li = e.target.parentNode.parentNode : '';
    // var oc = li.className.replace(' on','');
    // li.className = oc;
    this.setState({hover:null})
    e.stopPropagation();
  }
   
})


module.exports = TabSelect;


















