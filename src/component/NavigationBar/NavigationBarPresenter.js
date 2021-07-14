import React, {useEffect} from 'react';
import './NavigationBar.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';


export default function NavigationBarPresenter() {

    function animation(){
        var tabsNewAnim = $('#navbarSupportedContent');
        var activeItemNewAnim = tabsNewAnim.find('.active');
        var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        var itemPosNewAnimTop = activeItemNewAnim.position();
        var itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
          "top":itemPosNewAnimTop.top + "px", 
          "left":itemPosNewAnimLeft.left + "px",
          "height": activeWidthNewAnimHeight + "px",
          "width": activeWidthNewAnimWidth + "px"
        });
        $("#navbarSupportedContent").on("click","li",function(e){
          $('#navbarSupportedContent ul li').removeClass("active");
          $(this).addClass('active');
          var activeWidthNewAnimHeight = $(this).innerHeight();
          var activeWidthNewAnimWidth = $(this).innerWidth();
          var itemPosNewAnimTop = $(this).position();
          var itemPosNewAnimLeft = $(this).position();
          $(".hori-selector").css({
            "top":itemPosNewAnimTop.top + "px", 
            "left":itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
          });
        });
      }
    
      useEffect(() => {
        
        animation();
        $(window).on('resize', function(){
          setTimeout(function(){ animation(); }, 500);
        });
        
      }, []);
    
    return (
        <nav className="navbar navbar-expand-lg navbar-mainbg">
            <NavLink className="navbar-brand navbar-logo" to="/" exact>
                {/* <img src={require ("../../assets/simbol.png").default} /> */}
                <img src={require ("../../assets/simbol.png").default} class="d-inline-block align-top" alt=""/>
                HELPER ROBOTICS
            </NavLink>

            <button
                className="navbar-toggler"
                onClick={function () {
                    setTimeout(function () { animation(); });
                }}
                type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>  {/* 모바일 화면에서 =버튼 */}
            </button>
            <div 
                className="collapse navbar-collapse d-lg-flex" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">

                    <div className="hori-selector">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>

                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/" exact>
                            Statistics
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/monitor" exact>
                            Monitor
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dataInsert" exact>
                            DataInsert
                        </NavLink>
                    </li>
                    <li className="nav-item mobile-option">
                        <NavLink className="nav-link" to="/login" exact>
                        Login
                        </NavLink>
                    </li>
                </ul>
                {/* <form class="form-inline my-2 my-lg-0 mr-auto">
                    <button class="btn btn-outline-light btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                </form> */}
                
            </div>
            <div className="login-div">
                    {/* <li className="login-btn"> */}
                        <NavLink className="nav-link" to="/login" exact>
                            <button className="btn btn-outline-light login-btn">Login</button>
                            {/* Login */}
                        </NavLink>
                    {/* </li> */}
                </div>
        </nav>
    )
}
