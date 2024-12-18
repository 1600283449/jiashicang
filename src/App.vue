 <template>
   <div id="app">
     <keep-alive include="operation">
       <router-view></router-view>
     </keep-alive>
   </div>
 </template>
 
 <script>
 </script>
 <style type="text/css" lang="scss">
	 @import "assets/css/flex.css";
	 @import 'assets/icon/font/iconfont.css';
	 html{
	 	height: 100%;
	 }
	 body  {
	 	padding: 0;
	 	margin: 0;
	 	height: 100%;
	 }
	 p{
		 padding: 0;
		 margin: 0;
	 }
   #app{
	   height: 100vh;
	   // background-image: url("../assets/largeScreens.jpg");
	   .titletop {
		width: 100%;
	   	height: 10%;
	   	position: absolute;
		z-index:100;
	   	top: 0;
	   	left: 0;
		padding: 25px 0 0 0;
		box-sizing: border-box;
		background-image: linear-gradient(to bottom, black, transparent);
	   	.titletops {
	   		width: 30%;
	   		height: 100%;
	   		font-family: "Ding";
	   		position: relative;
	   
	   		.ecorations {
	   			position: absolute;
	   			width: 93%;
	   			bottom: 18px;
	   			left: 30px
	   		}
	   
	   		.titleName {
	   			width: 100%;
	   			height: 100%;
	   			color: #fff;
	   			font-size: 30px;
	   			text-align: center;
	   			position: absolute;
	   			top: -10px;
	   			font-family: "Ding";
	   		}
	   		.titleNameSelect{
	   			color: #fff;
	   			font-size: 30px;
	   			text-align: center;
	   			position: absolute;
	   			top: -10px;
	   			font-family: "Ding";
	   		}
	   		.titleNames {
	   			font-size: 20px;
	   			font-family: "Ding";
	   			top: 0px;
	   		}
	   	}
	   }
   }
 </style>
