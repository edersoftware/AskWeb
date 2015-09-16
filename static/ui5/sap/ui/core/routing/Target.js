/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider'],function($,E){"use strict";var t=E.extend("sap.ui.core.routing.Target",{constructor:function(o,v){this._oOptions=o;this._oViews=v;E.apply(this,arguments);},destroy:function(){this._oParent=null;this._oOptions=null;this._oViews=null;E.prototype.destroy.apply(this,arguments);this.bIsDestroyed=true;return this;},display:function(d){var p;if(this._oParent){p=this._oParent.display(d);}return this._place(p,d);},attachDisplay:function(d,f,l){return this.attachEvent(this.M_EVENTS.DISPLAY,d,f,l);},detachDisplay:function(f,l){return this.detachEvent(this.M_EVENTS.DISPLAY,f,l);},fireDisplay:function(a){return this.fireEvent(this.M_EVENTS.DISPLAY,a);},_getEffectiveViewName:function(v){var V=this._oOptions.viewPath;if(V){v=V+"."+v;}return v;},_place:function(p,d){var o=this._oOptions;p=p||{};var v,c=p.oTargetControl,V=p.oTargetParent;if(!this._isValid(p,true)){return;}if(!V&&o.rootView){V=sap.ui.getCore().byId(o.rootView);if(!V){$.sap.log.error("Did not find the root view with the id "+o.rootView,this);return;}}if(o.controlId){if(V){c=V.byId(o.controlId);}if(!c){c=sap.ui.getCore().byId(o.controlId);}if(!c){$.sap.log.error("Control with ID "+o.controlId+" could not be found",this);return;}}var a=c.getMetadata().getJSONKeys()[o.controlAggregation];if(!a){$.sap.log.error("Control "+o.controlId+" does not has an aggregation called "+o.controlAggregation,this);return;}var s=this._getEffectiveViewName(o.viewName);var b={viewName:s,type:o.viewType,id:o.viewId};if(this._bUseRawViewId){v=this._oViews._getViewWithGlobalId(b);}else{v=this._oViews._getView(b);}if(o.clearControlAggregation===true){c[a._sRemoveAllMutator]();}$.sap.log.info("Did place the view '"+s+"' with the id '"+v.getId()+"' into the aggregation '"+o.controlAggregation+"' of a control with the id '"+c.getId()+"'",this);c[a._sMutator](v);this.fireDisplay({view:v,control:c,config:this._oOptions,data:d});return{oTargetParent:v,oTargetControl:c};},_isValid:function(p,l){var o=this._oOptions,c=p&&p.oTargetControl,h=(c||o.controlId),i=true,L="";if(!h){L="The target "+o.name+" has no controlId set and no parent so the target cannot be displayed.";i=false;}if(!o.controlAggregation){L="The target "+o.name+" has a control id or a parent but no 'controlAggregation' was set, so the target could not be displayed.";i=false;}if(!o.viewName){L="The target "+o.name+" no viewName defined.";i=false;}if(l&&L){$.sap.log.error(L,this);}return i;},M_EVENTS:{DISPLAY:"display"}});return t;});
