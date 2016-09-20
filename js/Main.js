/*
Licensed under the MIT license.
http://www.opensource.org/licenses/mit-license.php
this file is part of HTMoL:
Copyright (C) 2014  Alvarez Rivera Leonardo,Becerra Toledo Francisco Javier, Vega Ramirez Adan
*/
var zoom,data,MainMenu;
var worker1;
var sizeglob=0;
var url;
var totalframes=0;
var totalframes1=0;
var numframe=0;
var trjbnd=false;
var bitrate=0;
var readstart=0; 
var readend=4999999;
var requireddata=false;
var pos=0;
var bndarray=true;
var bndbuffer=0;
var bndfinal=false;
var bndknowframe=false;
var bndreview=false;
var sizearrayp=0;
var trjauto=false;
var autoplay=true;
var fpath;

function Main()
{
	var main=this;
	this.ObjP= new Process();

	molecule=this.ObjP.ReadFile("1crn.pdb");

      var bond= new Bond();
            for (var t in molecule.GetChain())
            {
                 var chn=molecule.GetChain()[t];
                 for(var r in chn.GetAminoacid())
                 {
                       var amn=chn.GetAminoacid()[r];
                       for(var s in amn.GetAtoms())
                       {
                            var atom=amn.GetAtoms()[s];
                            for(var b in AtomsBonds[atom.NameAtom])
                            {
                                  var val=AtomsBonds[atom.NameAtom][b];
                                  for(var s in amn.GetAtoms())
                                  {

                                       var atomb=amn.GetAtoms()[s];
                                       if(val==atomb.NameAtom)
                                       {
                                          bond=this.ObjP.AddBond(bond,atom,atomb);
                                       }
                                  }
                            }
                       }
                 }
            }

      AtomosSeleccionados=molecule.LstAtoms;

	//this.Obj3D= new THREED(ObjRepresentation,main,main.ObjP);

    var Container=null;
    var buffer = new ArrayBuffer();



	this.Model= function(url)
	{
	    return function(event){
	   	try{
	   		//alert("deleteModel");
	   	main.DeleteModel();
	    main.MakeModel(url);   
		}catch(e)
		{
			data.innerHTML='Error: Invalid URL or Connection not available';
		}
	   }
	}
	
	this.MakeModel=function(url)
	{
		//alert("makeModel");
	   molecule=main.ObjP.ReadFile(url);	
	    var bond= new Bond();
            for (var t in molecule.GetChain())
            {
                 var chn=molecule.GetChain()[t];
                 for(var r in chn.GetAminoacid())
                 {
                       var amn=chn.GetAminoacid()[r];
                       for(var s in amn.GetAtoms())
                       {
                            var atom=amn.GetAtoms()[s];
                            for(var b in AtomsBonds[atom.NameAtom])
                            {
                                  var val=AtomsBonds[atom.NameAtom][b];
                                  for(var s in amn.GetAtoms())
                                  {

                                       var atomb=amn.GetAtoms()[s];
                                       if(val==atomb.NameAtom)
                                       {
                                          bond=this.ObjP.AddBond(bond,atom,atomb);
                                       }
                                  }
                            }
                       }
                 }
            }

	   initBuffers();

	   if(molecule!=null)
	   {
	   	   data.innerHTML="Loading...";
		   /*
		   PredictionAndCamera();
		   main.ObjP.Spheres(chain,main.Obj3D);
		   main.ObjP.representation.Bonds.MakeBonds(main.ObjP,main.Obj3D);
		   main.ObjP.representation.Skeleton.Make(main.Obj3D);		   

		   main.Obj3D.CenterObjects(main.ObjP.PointCenter.X,main.ObjP.PointCenter.Y,main.ObjP.PointCenter.Z);
		   main.Obj3D.DeleteButtons();
		   */
			

		   //main.Obj3D.Buttons(molecule);
		   if(main.ObjP.Model.Frames!=0 && main.ObjP.Model.Frames!=""){
		   main.filerequest();	
		   console.log(trjauto);	   
		   trjauto=true;
		   autoplay=false;
		   console.log(trjauto);
			}
		   data.innerHTML="";
	   }
	   else{
	   	data.innerHTML='Error: Iccnvalid URL or Connection not available';
	   }
	}

	this.DeleteModel=function()
	{
		/*
		main.ObjP.representation.CPK.Delete(main.Obj3D.scene);
		main.ObjP.representation.SpheresBonds.Delete(main.Obj3D.scene);
		main.ObjP.representation.Skeleton.Delete(main.Obj3D.scene);
		main.ObjP.representation.Bonds.Delete(main.Obj3D.scene);
		main.Obj3D.DeleteMarkers();
		main.Obj3D.DeleteMeasures();
		main.Obj3D.DeleteButtons();
		*/
	}



	this.MakeMenu=function(container)
	{
		var hope="<link rel='stylesheet' type='text/css' href='styles/component.css' />"
				+"<link rel='stylesheet' type='text/css' href='styles/Styles.css' />"
				+"	<div id='Menus'>"
				+"	<div id='zoom'></div>"
				+"	<div id='menu'></div>"
				+"	</div>"
				+"	<div id='MainMenu'>"
				+"		<div id='dl-menu' class='dl-menuwrapper'>"
				+"		<button class='dl-trigger'>Open Menu</button>"
				+" 		<ul class='dl-menu'>"
				+"		<li><a href='#'>Open</a>"
				+"		<UL  id='Molecule' class='dl-submenu'></UL>"
				+"			</li><li><a href='#'>Select</a>"
				+"			<ul class='dl-submenu'>"
				+"				<li><a href='#'>Aminoacid</a>"
				+"		   <ul id='sub-Amin' class='dl-submenu'>"
				+"			   <li><a href='#' id='ALA'>ALA</a></li>" 
				+"			   <li><a href='#' id='ARG'>ARG</a></li>" 
				+"			   <li><a href='#' id='ASN'>ASN</a></li>" 
				+"			   <li><a href='#' id='ASP'>ASP</a></li>" 
				+"			   <li><a href='#' id='CYS'>CYS</a></li>" 
				+"			   <li><a href='#' id='GLN'>GLN</a></li>" 
				+"			   <li><a href='#' id='GLU'>GLU</a></li>" 
				+"			   <li><a href='#' id='GLY'>GLY</a></li>" 
				+"			   <li><a href='#' id='HIS'>HIS</a></li>" 
				+"			   <li><a href='#' id='ILE'>ILE</a></li>"
				+"			   <li><a href='#' id='LEU'>LEU</a></li>" 
				+"			   <li><a href='#' id='LYS'>LYS</a></li>" 
				+"			   <li><a href='#' id='MET'>MET</a></li>" 
				+"			   <li><a href='#' id='PHE'>PHE</a></li>" 
				+"			   <li><a href='#' id='PRO'>PRO</a></li>" 
				+"			   <li><a href='#' id='SER'>SER</a></li>" 
				+"			   <li><a href='#' id='THR'>THR</a></li>" 
				+"			   <li><a href='#' id='TRP'>TRP</a></li>" 
				+"			   <li><a href='#' id='TYR'>TYR</a></li>" 
				+"			   <li><a href='#' id='VAL'>VAL</a></li>" 
				+"		   </ul>" 
				+"	   </li>" 
				+"	   <li>" 
				+"	   <a href='#'>Atom</a>" 
				+"	   <ul id='sub-Atom' class='dl-submenu'>" 
				+"		   <li><a href='#' id='C'>C</a></li>" 
				+"		   <li><a href='#' id='H'>H</a></li>" 
				+"		   <li><a href='#' id='O'>0</a></li>" 
				+"		   <li><a href='#' id='PB'>PB</a></li>" 
				+"		   <li><a href='#' id='TI'>TI</a></li>" 
				+"		   <li><a href='#' id='N'>N</a></li>" 
				+"		   <li><a href='#' id='S'>S</a></li>" 
				+"		   <li><a href='#' id='P'>P</a></li>" 
				+"	   </ul> </li> <li> <a href='#'>Color</a>" 
				+"	   <ul id='sub-color'class='dl-submenu'>" 
				+"		   <li><a href='#' id='yellow'>Yellow</a></li>" 
				+"		   <li><a href='#' id='red'>Red</a></li>" 
				+"		   <li><a href='#' id='orange'>Orange</a></li>" 
				+"		   <li><a href='#' id='blue'>Blue</a></li>" 
				+"		   <li><a href='#' id='bluesky'>Blue Sky</a></li>" 
				+"		   <li><a href='#' id='green'>Green</a></li>" 
				+"		   <li><a href='#' id='purple'>Purple</a></li>" 
				+"		   <li><a href='#' id='pink'>Pink</a></li>" 
				+"		   <li><a href='#' id='gray'>Gray</a></li>" 
				+"		   <li><a href='#' id='brown'>Brown</a></li>" 
				+"		   <li><a href='#' id='DefaultColor'>Default</a></li>" 
				+"	   </ul> </li>" 
				+"	   <li><a href='#' id='All'>All</a></li>" 
				+"	   <li><a href='#' id='Show'>Show</a></li> </ul> </li>" 
				+"	   <li><a href='#'>Actions</a>" 
				+"	   <ul class='dl-submenu'>" 
				+"	   <li><a href='#'>View</a>" 
				+"	   <ul class='dl-submenu'>" 
				+"	   <li><a href='#' id='F'>Front</a></li>" 
				+"	   <li><a href='#' id='L'>Left</a></li>" 
				+"	   <li><a href='#' id='R'>Right</a></li>" 
				+"	   <li><a href='#' id='U'>Up</a></li>" 
				+"	   <li><a href='#' id='D'>Down</a></li>" 
				+"	   <li><a href='#' id='B'>Back</a></li> </ul> </li>" 
				+"	   <li><a href='#'>Markers</a> <ul class='dl-submenu'>" 
				+"	   <li><a href='#' id='ShowMarkers'>Show Markers</a></li>" 
				+"	   <li><a href='#' id='HideMarkers'>Hide Markers</a></li>" 
				+"	   <li><a href='#' id='DeleteMarkers'>Delete Markers</a></li>"
				+"	    </ul> </li> <li><a title='Atom Select' href='#'>A.Selected</a>" 
				+"	    <ul class='dl-submenu'>" 
				+"	    <li><a href='#' id='NameAtom'>Name Atom</a></li>" 
				+"	    <li><a href='#' id='NumberAtom'>Number Atom</a></li>" 
				+"	    <li><a href='#' id='DetailsAtom'>Details Atom</a></li>" 
				+"	    <li><a href='#' id='Center'>Center Atom</a></li>"
				+"	    <li><a href='#' id='Identify'>Identify</a></li>" 
				+"	    <li><a href='#' id='None1'>None</a></li> </ul> </li>" 
				+"	    <li><a href='#'>Measures</a> <ul class='dl-submenu'>" 
				+"	    <li><a href='#' id='Distance'>Distance</a></li>" 
				+"	    <li><a href='#' id='Angle'>Angle</a></li>" 
				+"	    <li><a href='#' id='None2'>None</a></li>" 
				+"	    <li><a href='#' id='DeleteMeasures'>Delete Measures</a></li>" 
				+"	    </ul> </li>" 
				+"	    <li><a href='#'  title='Helix and Sheet' id='ViewHS'>H & S</a></li>" 
				+"	    <li><a href='#' id='Axis'>Axis</a></li>"
				+"	    <li><a href='#' title='Molecule Center' id='MoleculeCenter'>M.Center</a></li>"
				+"	    </ul></li>"
				+"	    <li><a href='#'>Representations</a>" 
				+"	    <ul class='dl-submenu'>" 
				+"	    <li><a href='#' id='CPK'>CPK</a></li>" 
				+"	    <li><a href='#' id='Bonds'>Bonds</a></li>" 
				+"	    <li><a href='#' title='Spheres Bonds' id='Spheres Bonds'>S.Bonds</a></li>" 
				+"	    <li><a href='#' id='Skeleton'>Skeleton</a></li> </ul> </li> </ul> </div></div>"
				document.getElementById('WebGL-Out').innerHTML = hope; 
		var tagjs = document.createElement("script");       
      	tagjs.setAttribute("src", "fonts/optimer_regular.typeface.js");
      	document.getElementsByTagName("head")[0].appendChild(tagjs);
		Container=container;
		//Container.onmouseover=function (){main.Obj3D.updatecontrols=true};
        //Container.onmouseout=function (){main.Obj3D.updatecontrols=false};
		var Menus = document.getElementById("Menus");
  		main.menu=document.getElementById("menu");
		var webgl = document.getElementById("WebGL-Out");
  		MainMenu = document.getElementById('div');
  		data = document.getElementById("data");
  		zoom = document.getElementById("zoom");

  		
        if(typeof(URLS) != "undefined")
        	{ 
        		 for(var i in URLS)
			    {		
			    	var button = document.getElementById( "Molecule" ); 
		        	button.innerHTML+='<li><a href="#" id="new"></a></li>';	

		        	button = document.getElementById("new"); 
		        	button.id=URLS[i].name;
		        	button.innerHTML=URLS[i].name;
			    }
		  
        	}
		else{ 
			URLS = null;
			}

	    var button = document.getElementById( "Molecule" ); 
        button.innerHTML+='<li><a href="#" id="ByURL">By URL</a></li>';
        button.innerHTML+='<li><a href="#" id="trajauto">Auto trajectory</a></li>';
        button.innerHTML+='<li><a href="#" id="loadtraj">Load trajectory</a></li>';
        button = document.getElementById( "ByURL" ); 
        button.onclick=this.ScenebyURL();

        
        var buttontraj = document.getElementById( "loadtraj" ); 
        buttontraj.onclick=this.ScenebyTrajectory();

        var buttontrj = document.getElementById( "trajauto" ); 
        buttontrj.onclick=function(){
        	url="http://127.0.0.1:25565/test/prueba.pdb";
        	//main.DeleteModel();
        	main.MakeModel(url);
        }
        
      /*
        for(var i in URLS)
	    {		
	    	var button = document.getElementById( URLS[i].name ); 
        	button.onclick=this.Model(URLS[i].url);
	    }
		
		var o=0;
	    
	    if(typeof(URLS) != "undefined")
        { 
		    for(var i in URLS)
		    {
			    if (o==0) 
			    {
			    	main.DeleteModel();
					main.MakeModel(URLS[i].url);
				}
				o++;
			}
		}*/

	    //main.Obj3D.Rendering(webgl); 

	}

	this.Scene=function(url)
	{
	    return function(event)
	    {
	    main.Model(url);
	    }
	}
	
	this.ScenebyURL=function()
	{
        return function(event)
        {
        	//se coloca la ip del servidor y el puerto que se abrió
        	    url = prompt("URL: ", "http://187.140.221.127:25565/test/2vep_md_prot.pdb");
		    if(url!=''){
			if(url.length==4)
			url="http://www.rcsb.org/pdb/files/"+url+".pdb";
			//alert(url);
		    try{
			  main.DeleteModel();
		    main.MakeModel(url); 
		    }catch(e)
			{
				data.innerHTML='Error: Invalid URL or Connection not available';
			}
		     }
		     
		}
	}

	this.trajreview=function(){	
	alert("help");	
	trjauto=true;
	bndknowframe=true;
	$('#loadtraj').click();		
	}

	this.ScenebyTrajectory=function()
	{
			return function(event)
        {
		    try{
		    	bndfinal=false;	
		    	main.filerequest();
		    }catch(e)
			{
				data.innerHTML='Error: Invalid file or Connection not available '.concat(e);
			}		     
		}
	}



this.filerequest=function(){
        trjbnd=false;
        numframe=0;
		requireddata=false;
		totalframes=0;
		pos=0;
        sizeglob=0;
		readend=4999999;
		readstart=0;
		bndbuffer=0;
		sizearrayp=0;
        coordsX= new Float32Array();
		coordsX1=new Float32Array();
        coordsY= new Float32Array();
		coordsY1=new Float32Array();	
        coordsZ= new Float32Array();
		coordsZ1=new Float32Array();
        bndreview = false;      
        bitratespeed();  
      var interval=setInterval(function(){
        if((sizeglob/molecule.GetAtoms().length)>0){
         trjbnd=true;
        var button=document.getElementById("playpause");
        button.style.display="inline";
          clearInterval(interval);
        }
      },1000);
      //main.Obj3D.getDataAtoms();
      }

function bitratespeed(){
var imageAddr = "speedtest.jpg" + "?n=" + Math.random() ;
var startTime, endTime ;
var downloadSize = 81877; 
var download = new Image() ; 
download.onload = function() { 
endTime = (new Date()).getTime() ; 
senddataworker(startTime,endTime,downloadSize) ;
}
startTime = (new Date()).getTime() ; 
download.src = imageAddr ;
}

function senddataworker(startTime,endTime,downloadSize) {
  var duration = Math.round((endTime - startTime) / 1000) ; 
  var bitsLoaded = downloadSize * 8 ;
  bitrate = Math.round(bitsLoaded / duration) ;
  if(!trjauto){
  fpath = window.prompt("enter path file","2vep_md_prot_fit.xtc");
  main.ObjP.Model.TrjPath=fpath;
  bndknowframe=false;
   }else{
   	fpath=main.ObjP.Model.TrjPath;
   	bndknowframe=true;
   	trjauto=false;
   	if(autoplay==false){
   	totalframes1=main.ObjP.Model.Frames;
   	var button = document.getElementById("playpause");
   	button.value = 'Play';
     }
   }
   if(autoplay)
   {
  data.innerHTML='Loading trajectory ... '
	}
  worker1.postMessage({cmd:"startfile",
                       fpath:fpath,
                       natoms:molecule.GetAtoms().length,
                       bitrate:bitrate,
                       readstart: readstart,
                       readend:readend});
var intervalreq= setInterval(function(){
	if(bndfinal==true){
		console.log("ya lo borro");
		clearInterval(intervalreq);
		}else{
	if(parseInt(totalframes)==numframe && bndfinal==true){
		//main.DeleteModel();
		//main.MakeModel(url);
		console.log("lo va a borrar");
		clearInterval(intervalreq);
		}
    if(totalframes>200 && (totalframes-numframe)<=200 && requireddata==true){
      requireddata=false;
      sizearrayp=0;
      if(bndbuffer==1){
        coordsX = new Float32Array(sizearrayp);
        coordsY = new Float32Array(sizearrayp);
        coordsZ = new Float32Array(sizearrayp);
      }else{
        coordsX1 = new Float32Array(sizearrayp);
        coordsY1 = new Float32Array(sizearrayp);
        coordsZ1 = new Float32Array(sizearrayp);
      }
      worker1.postMessage({cmd:"startfile",
                           fpath:fpath, 
                            natoms:molecule.GetAtoms().length,
                            bitrate:bitrate,
                            readstart: readstart,
                            readend:readend});
    }
  }
  },2000);
} 

}

$(function ()
{
var main= new Main();
var container = document.getElementById("Contenedor");
//main.SetBackgroundColor(0xff0000);
main.MakeMenu(container);

});