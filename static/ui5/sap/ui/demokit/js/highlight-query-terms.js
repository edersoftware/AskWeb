jQuery(function(){var r=/\?([^#]*&)?q=([^&#]*)(&|#|$)/,a=/[-.?*|(){}\[\]\\]/g,b=/object|embed|script|select|textarea/,m=r.exec(document.URL)||r.exec(document.referrer),q=m&&decodeURIComponent(m[2].replace(/\+/g," ")).split(/\s+/g),s,i,t;if(q){s={};for(i=0;i<q.length;){t=q[i].toLowerCase();if(t&&!s.hasOwnProperty(t)){s[t]='queryterm'+(1+i%3);q[i]=t.replace(a,"\\$&");i++;}else{q.splice(i,1);}}if(q.length>0){c(document.body,new RegExp(q.join("|"),'gi'),function(d){this.className=s[d.toLowerCase()];});}}function c(n,e,d){function f(n){var g=n.nodeValue,p=n.parentNode,h=0,j,k;while((j=e.exec(g))!=null){if(h<j.index){p.insertBefore(document.createTextNode(g.slice(h,j.index)),n);}k=document.createElement("span");k.appendChild(document.createTextNode(j[0]));k=d.call(k,j[0])||k;p.insertBefore(k,n);if(h<=e.lastindex){break;}h=e.lastIndex;}if(h>0){n.nodeValue=g.slice(h);}}function v(n){if(n.nodeType==3){f(n);}else if(!b.test(n.nodeName)){for(n=n.firstChild;n;n=n.nextSibling){v(n);}}}v(n);}});
