AUI.add("aui-tree-data",function(l){var g=l.Lang,k=g.isArray,j=g.isObject,c=g.isUndefined,u="boundingBox",e="children",m="container",o=".",h="id",s="index",r="nextSibling",w="node",d="ownerTree",f="parentNode",p="prevSibling",n="previousSibling",q="tree",b="tree-data",i=function(x){return(x instanceof l.TreeNode);},t=l.getClassName,a=t(q,w);var v=l.Component.create({NAME:b,ATTRS:{container:{setter:l.one},children:{value:[],validator:k,setter:"_setChildren"},index:{value:{}}},prototype:{initializer:function(){var x=this;x.publish("move");x.publish("collapseAll",{defaultFn:x._collapseAll});x.publish("expandAll",{defaultFn:x._expandAll});x.publish("append",{defaultFn:x._appendChild});x.publish("remove",{defaultFn:x._removeChild});},destructor:function(){var x=this;x.eachChildren(function(y){y.destroy();},true);},getNodeById:function(y){var x=this;return x.get(s)[y];},isRegistered:function(y){var x=this;return !!(x.get(s)[y.get(h)]);},updateReferences:function(A,B,E){var F=this;var D=A.get(f);var x=A.get(d);var C=D&&(D!==B);if(D){if(C){var y=D.get(e);l.Array.removeItem(y,F);D.set(e,y);}D.unregisterNode(A);}if(x){x.unregisterNode(A);}A.set(f,B);A.set(d,E);if(B){B.registerNode(A);}if(E){E.registerNode(A);}if(x!==E){A.eachChildren(function(G){F.updateReferences(G,G.get(f),E);});}if(C){var z=F.getEventOutputMap(A);if(!D.get("children").length){D.collapse();D.hideHitArea();}z.tree.oldParent=D;z.tree.oldOwnerTree=x;F.bubbleEvent("move",z);}},refreshIndex:function(){var x=this;x.updateIndex({});x.eachChildren(function(y){x.registerNode(y);},true);},registerNode:function(A){var x=this;var z=A.get(h);var y=x.get(s);if(z){y[z]=A;}x.updateIndex(y);},updateIndex:function(y){var x=this;if(y){x.set(s,y);}},unregisterNode:function(z){var x=this;var y=x.get(s);delete y[z.get(h)];x.updateIndex(y);},collapseAll:function(){var x=this;var y=x.getEventOutputMap(x);x.fire("collapseAll",y);},_collapseAll:function(y){var x=this;x.eachChildren(function(z){z.collapse();},true);},expandAll:function(){var x=this;var y=x.getEventOutputMap(x);x.fire("expandAll",y);},_expandAll:function(y){var x=this;x.eachChildren(function(z){z.expand();},true);},selectAll:function(){var x=this;x.eachChildren(function(y){y.select();},true);},unselectAll:function(){var x=this;x.eachChildren(function(y){y.unselect();},true);},eachChildren:function(A,y){var x=this;var z=x.getChildren(y);l.Array.each(z,function(B){if(B){A.apply(x,arguments);}});},eachParent:function(z){var y=this;var x=y.get(f);while(x){if(x){z.apply(y,[x]);}x=x.get(f);}},bubbleEvent:function(B,A,C,z){var y=this;y.fire(B,A);if(!C){var x=y.get(f);A=A||{};if(c(z)){z=true;}A.stopActionPropagation=z;while(x){x.fire(B,A);x=x.get(f);}}},createNode:function(y){var x=this;var z=l.TreeNode.nodeTypes[j(y)?y.type:y]||l.TreeNode;return new z(j(y)?y:{});},appendChild:function(A,z){var x=this;var y=x.getEventOutputMap(A);x.bubbleEvent("append",y,z);},_appendChild:function(E){if(E.stopActionPropagation){return false;}var x=this;var D=E.tree.node;var y=x.get(d);var B=x.get(e);x.updateReferences(D,x,y);var C=B.push(D);x.set(e,B);var A=C-2;var z=x.item(A);D.set(r,null);D.set(p,z);x.get(m).append(D.get(u));D.render();},item:function(y){var x=this;return x.get(e)[y];},indexOf:function(y){var x=this;return l.Array.indexOf(x.get(e),y);},hasChildNodes:function(){return(this.get(e).length>0);},getChildren:function(y){var x=this;var A=[];var z=x.get(e);A=A.concat(z);if(y){x.eachChildren(function(B){A=A.concat(B.getChildren(y));});}return A;},getEventOutputMap:function(y){var x=this;return{tree:{instance:x,node:y||x}};},removeChild:function(z){var x=this;var y=x.getEventOutputMap(z);x.bubbleEvent("remove",y);},_removeChild:function(B){if(B.stopActionPropagation){return false;}var x=this;var A=B.tree.node;var y=x.get(d);if(x.isRegistered(A)){A.set(f,null);x.unregisterNode(A);A.set(d,null);if(y){y.unregisterNode(A);}A.get(u).remove();var z=x.get(e);l.Array.removeItem(z,A);x.set(e,z);}},empty:function(){var x=this;x.eachChildren(function(z){var y=z.get(f);if(y){y.removeChild(z);}});},insert:function(E,B,C){var H=this;B=B||this;if(B===E){return false;}var x=B.get(f);if(E&&x){var D=E.get(u);var A=B.get(u);var G=B.get(d);if(C==="before"){A.placeBefore(D);}else{if(C==="after"){A.placeAfter(D);}}var y=[];var F=x.get(u).all("> ul > li");F.each(function(I){y.push(l.Widget.getByNode(I));});E.set(r,l.Widget.getByNode(D.get(r)));E.set(p,l.Widget.getByNode(D.get(n)));B.updateReferences(E,x,G);x.set(e,y);}E.render();var z=B.getEventOutputMap(E);z.tree.refTreeNode=B;B.bubbleEvent("insert",z);},insertAfter:function(y,x){x.insert(y,x,"after");},insertBefore:function(y,x){x.insert(y,x,"before");},getNodeByChild:function(z){var x=this;var y=z.ancestor(o+a);if(y){return x.getNodeById(y.attr(h));}return null;},_setChildren:function(y){var x=this;var z=[];l.Array.each(y,function(A){if(A){if(!i(A)&&j(A)){A=x.createNode(A);}if(!i(x)){A.set(d,x);}A.render();if(l.Array.indexOf(z,A)===-1){z.push(A);}}});return z;}}});l.TreeData=v;},"@VERSION@",{requires:["aui-base"],skinnable:false});