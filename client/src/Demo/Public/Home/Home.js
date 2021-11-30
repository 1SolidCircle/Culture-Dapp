import React, { Fragment, useEffect } from "react";
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import '../../../assets/scss/css/base.css';
import '../../../assets/scss/css/main.css';
import '../../../assets/scss/css/flexslider.css';
import '../../../assets/scss/css/magnific-popup.css';

import '../../../assets/scss/css/style.css';
import { useSelector} from 'react-redux';

const Home = (props) => {

    const isUser = useSelector((state) => state.userDetails.user);
   
    useEffect(() => {
        if (window && document) {


            const body = document.getElementsByTagName('body')[0]
          
            const scriptAudio = document.createElement('script')
            scriptAudio.src = 'js/audio.min.js';
            body.appendChild(scriptAudio)
            
            scriptAudio.addEventListener('load', () => {

                const script1 = document.createElement('script');
                script1.src = 'js/jquery.flexslider-min.js';
                body.appendChild(script1);

                script1.addEventListener('load', () => {
                    const script2 = document.createElement('script');
                    script2.src = 'js/smooth-scroll.js';
                    body.appendChild(script2);
                    
                    script2.addEventListener('load', () => {

                        const script3 = document.createElement('script');
                        script3.src = 'js/jquery.countdown.min.js';
                        body.appendChild(script3);

                        script3.addEventListener('load', () => {

                            const script4 = document.createElement('script');
                            script4.src = 'js/jquery.magnific-popup.min.js';
                            body.appendChild(script4);

                            script4.addEventListener('load', () => {
                                const script = document.createElement('script');
                                script.src = 'js/script.js';
                                script.id = 'csscript';
                                body.appendChild(script);
                            });
                        });
                    });
                });
            });

            // const script1 = document.createElement('script');
            // script1.src = 'js/jquery.flexslider-min.js';
            // body.appendChild(script1);

            
            



        //   script.addEventListener('load', () => {
        //     window.hbspt.forms.create({
        //       // this example embeds a Hubspot form into a React app but you can tweak it for your use case
        //       // any code inside this 'load' listener will run after the script is appended to the page and loaded in the client
        //     })
        //   })
        }
        
        return () => {
            // alert('removed')
            // if (scriptTagRef.current) {
              console.log("removed"); 
            //   document.body.removeChild(scriptTagRef.current);
            // }
        };

    }, []);

    return (
        <Aux>
            {/* <div className="loader">
                <div className="loader-inner">
                    <svg width="120" height="220" viewBox="0 0 100 100" className="loading-spinner" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle className="spinner" cx="50" cy="50" r="21" fill="#13181d" strokeWidth="2" />
                    </svg>
                </div>
            </div> */}
            <div className="wrapper">
                <div className="block-search-form">
                    <div className="block-content">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8">
                                    <form method="get"  >
                                        <div className="card  bg-red ">
                                            <div className="card-body  row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <i className="feather icon-search"></i>
                                                </div>
                                                <div className="col">
                                                    <input className="form-controle form-control-lg form-control-border0" placeholder="Type a keywords..." type="search" />
                                                </div>
                                                <div className="col-auto">
                                                    <button type="submit" className="btn  btn-primary btn-primary2 uppercase border-3">
                                                        Search now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="hero">
                    <div className="main-slider slider flexslider">
                        <ul className="slides">
                            <li>
                                <div className="background-img overlay zoom">
                                    <img src="img/1.jpg" alt="" />
                                </div>
                                <div className="container hero-content">
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <div className="inner-hero">
                                                <div className="back-rect"></div>
                                                <h1 className="large text-white uppercase mb-0">The Culture Dapp</h1>
                                                <h5 className="mb-0 text-white uppercase">Our new way of life</h5>
                                                <div className="front-rect"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="background-img overlay zoom">
                                    <img src="img/2.jpg" alt="" />
                                </div>
                                <div className="container hero-content">
                                    <div className="row">
                                        <div className="col-sm-12 text-center">
                                            <div className="inner-hero">
                                                <h1 className="large text-white uppercase mb-0">limitless</h1>
                                                <h5 className="mb-0 text-white uppercase">New Album Available Everywhere</h5>
                                                <a className="video-play-but popup-youtube" href="https://www.youtube.com/watch?v=Gc2en3nHxA4"></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <header className="header default">
                        <div className=" left-part">
                            <a className="logo scroll" href="#wrapper">
                                <h2 className="mb-0 uppercase" style={{ lineHeight: '3rem' }}>Culture Dapp.</h2>
                            </a>
                        </div>
                        <div className="right-part">
                            <nav className="main-nav">
                                <div className="toggle-mobile-but">
                                    <a href="#" className="mobile-but" >
                                        <div className="lines"></div>
                                    </a>
                                </div>
                                <ul className="main-menu list-inline">
                                    <li><a className="scroll list-inline-item" href="#wrapper">Home</a></li>
                                    <li><a className="scroll list-inline-item" href="#about">about</a></li>
                                    <li><a className="scroll list-inline-item" href="#discography">discography</a></li>
                                    <li><a className="scroll list-inline-item" href="#band">Band</a></li>
                                    <li className="dropdown"><a className="scroll list-inline-item" href="#tour">Tours</a></li>
                                    <li><a className="scroll list-inline-item" href="#gallery">Gallery</a></li>
                                    <li><a className="scroll list-inline-item " href="#news">News</a></li>
                                    <li><a className="scroll list-inline-item" href="#contact">Contact</a></li>
                                    <li><a className="scroll list-inline-item" href="/listen">Listen</a></li>
                                    { isUser && Object.keys(isUser).length ? <li><a className="scroll list-inline-item" href="/profile">My Account</a></li> : null }
                                    { !isUser ? <li><a className="scroll list-inline-item" href="/login">Sign In</a></li> : null }
                                    { !isUser ? <li><a className="scroll list-inline-item" href="/signup">Sign Up</a></li> : null }

                                    <li className="block-helper">
                                        <a href="#album" className="scroll"><span ><i className="icon-cd-2"></i></span></a>
                                    </li>
                                    <li className="block-helper">
                                        <span className="icon search-ico"><i className="feather icon-search"></i></span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                </section>
                <section id="album" className="latest main">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-9 ">
                                <div className="block-content text-center gap-one-bottom-md">
                                    <div className="block-title ">
                                        <h1 className="uppercase">Latest album</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12  col-lg-4  ">
                                <div className="block-content text-center gap-one-bottom-sm">
                                    <div className="block-album-info">
                                        <ul>
                                            <li><h5 className=" uppercase list-inline-item ">Label</h5> <span>Limitless</span></li>
                                            <li><h5 className=" uppercase list-inline-item">Released</h5> <span>March 23/3/18</span></li>
                                            <li><h5 className=" uppercase list-inline-item">Genre</h5> <span>Pop/Rock/techno</span></li>
                                            <li><h5 className="uppercase list-inline-item">Styles</h5> <span>Revival/Indie Rock</span></li>
                                            <li />
                                        </ul>
                                    </div>
                                    <ul className="block-social list-inline mt-4">
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-apple"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-play"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-amazon"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-soundcloud"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-spotify"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-8 col-md-10">
                                <div className="block-tracklist">
                                    <audio preload="true" className="album"></audio>
                                    <div className="block-content pb-0">
                                        <img className="mb-0" src="img/album/5.jpg" alt="" />
                                    </div>
                                    <ol className="playlist">
                                        <li>
                                            <div className="as-link" data-src="mp3/01.mp3">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 ">
                                                        <div className="block-track">
                                                            <h6 className="mb-0 opc-70 uppercase">Love alive</h6>
                                                            <span>Limitless </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 text-md-right">
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico" ><i className="icon-download"></i>Download</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li >
                                            <div className="as-link" data-src="mp3/01.mp3">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="block-track">
                                                            <h6 className="mb-0 opc-70 uppercase ">Hope</h6>
                                                            <span> Limitless</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 text-md-right">
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico border-2 toggle-lyrics"><i className="icon-note"></i>Lyrics</a>
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico" ><i className="icon-cart"></i>Purchase</a>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <div className="block-lyrics w-75 text-center mt-3">
                                                            <h5 className="mb-4 opc-70 uppercase ">Hope</h5>
                                                            <p>Liberian girl
                                                                You came and you changed my world
                                                                A love so brand new
                                                                Liberian girl
                                                                You came and you changed my world
                                                                A feeling so true
                                                            </p>
                                                            <p>Liberian girl
                                                                You know that you came
                                                                And you changed my world
                                                                Just like in the movies
                                                                With two lovers in a scene
                                                                And she says
                                                                "Do you love me"
                                                                And he says so endlessly
                                                                "I love you, Liberian girl"
                                                            </p>
                                                            <p>Liberian girl
                                                                More precious than any pearl
                                                                Your love so complete
                                                                Liberian girl
                                                                You kiss me then,
                                                                Ooh, the world
                                                                You do this to me
                                                                Liberian girl
                                                                You know that you came
                                                                And you changed my world
                                                                Just like in the movies
                                                                With two lovers in a scene
                                                                And she says
                                                                "Do you love me"
                                                                And he says so endlessly
                                                                "I love you, Liberian girl"
                                                            </p>
                                                            <p>Liberian girl
                                                                You know that you came
                                                                And you changed my world
                                                                I wait for the day
                                                                When you have to say
                                                                "I do"…
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li >
                                            <div className="as-link" data-src="mp3/01.mp3">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="block-track">
                                                            <h6 className="mb-0 opc-70 uppercase">Bounce out</h6>
                                                            <span>Limitless </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 text-md-right">
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico" ><i className="icon-download"></i>Download</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li >
                                            <div className="as-link" data-src="mp3/01.mp3">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="block-track">
                                                            <h6 className="mb-0 opc-70 uppercase">Girls are the same</h6>
                                                            <span>Limitless </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 text-md-right">
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico"><i className="icon-download"></i>Download</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li >
                                            <div className="as-link" data-src="mp3/01.mp3">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="block-track">
                                                            <h6 className="mb-0 opc-70 uppercase ">My queen</h6>
                                                            <span>Limitless </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 text-md-right">
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico border-2 toggle-lyrics"><i className="icon-note"></i>Lyrics</a>
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico" ><i className="icon-cart"></i>Purchase</a>
                                                    </div>
                                                    <div className="col-12 ">
                                                        <div className="block-lyrics w-75  text-center mt-3">
                                                            <h5 className="mb-4 opc-70 uppercase ">My queen</h5>
                                                            <p>Liberian girl
                                                                You came and you changed my world
                                                                A love so brand new
                                                                Liberian girl
                                                                You came and you changed my world
                                                                A feeling so true
                                                            </p>
                                                            <p>Liberian girl
                                                                You know that you came
                                                                And you changed my world
                                                                Just like in the movies
                                                                With two lovers in a scene
                                                                And she says
                                                                "Do you love me"
                                                                And he says so endlessly
                                                                "I love you, Liberian girl"
                                                            </p>
                                                            <p>Liberian girl
                                                                More precious than any pearl
                                                                Your love so complete
                                                                Liberian girl
                                                                You kiss me then,
                                                                Ooh, the world
                                                                You do this to me
                                                                Liberian girl
                                                                You know that you came
                                                                And you changed my world
                                                                Just like in the movies
                                                                With two lovers in a scene
                                                                And she says
                                                                "Do you love me"
                                                                And he says so endlessly
                                                                "I love you, Liberian girl"
                                                            </p>
                                                            <p>Liberian girl
                                                                You know that you came
                                                                And you changed my world
                                                                I wait for the day
                                                                When you have to say
                                                                "I do"…
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li >
                                            <div className="as-link" data-src="mp3/01.mp3">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="block-track">
                                                            <h6 className="mb-0 opc-70 uppercase">Falling apart</h6>
                                                            <span>Limitless </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 text-md-right">
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico" ><i className="icon-download"></i>Download</a>
                                                        <a href="#" className="btn-s uppercase btn btn-primary btn-primary2 with-ico" ><i className="icon-basket"></i>Purchase</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="about" className="about overlay main">
                    <div className="background-img" >
                        <img src="img/25.jpg" alt="" />
                    </div>
                    <div className="container">
                        <div className="row  vertical-align">
                            <div className="col-lg-12 col-md-12">
                                <div className="front-p">
                                    <h1 className="uppercase text-white">The Culture Dapp<br />Our new way of life</h1>
                                    <p className=" w-93">The Culture Dapper is the new social media platform that allows users to post pictures, music and various content and get paid in the process. The more likes, stream, and shares you receive, the more you will in turn be paid. Imagine getting paid for the amount of effort you put into Facebook, Snap Chat, or Instagram... </p>
                                    <ul className="block-social list-inline mb-4 mb-lg-0">
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-apple"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-play"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-amazon"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-spotify"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-soundcloud"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="discography" className="discography main">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-9 ">
                                <div className="block-content text-center gap-one-bottom-md">
                                    <div className="block-title ">
                                        <h1 className="uppercase">Discography</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="block-album block-content">
                                    <h5 className="mb-0 opc-70 uppercase">Limitless</h5>
                                    <a className="link" href="#">View Album ›</a>
                                    <a href="#">
                                        <img className="animated" src="img/album/1.jpg" alt="" />
                                    </a>
                                    <ul className="block-social list-inline mb-md-3">
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-apple"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-play"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-amazon"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-soundcloud"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="block-album block-content">
                                    <h5 className="mb-0 opc-70 uppercase">Set me free</h5>
                                    <a className="link" href="#">View Album ›</a>
                                    <a href="#">
                                        <img className="animated" src="img/album/2.jpg" alt="" />
                                    </a>
                                    <ul className="block-social list-inline mb-md-3">
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-apple"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-play"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-amazon"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-soundcloud"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="block-album block-content">
                                    <h5 className="mb-0 opc-70 uppercase">How It Feels</h5>
                                    <a className="link" href="#">View Album ›</a>
                                    <a href="#">
                                        <img className="animated" src="img/album/3.jpg" alt="" />
                                    </a>
                                    <ul className="block-social list-inline mb-md-3">
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-apple"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-play"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-amazon"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-soundcloud"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="block-album block-content">
                                    <h5 className="mb-0 uppercase opc-70">Tonight</h5>
                                    <a className="link" href="#">View Album ›</a>
                                    <a href="#">
                                        <img className="animated" src="img/album/4.jpg" alt="" />
                                    </a>
                                    <ul className="block-social list-inline mb-md-3">
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-apple"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-play"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-amazon"></i></a></li>
                                        <li className="list-inline-item mr-0"><a href="#"><i className="socicon-soundcloud"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="divider overlay">
                    <div className="background-img" >
                        <img src="img/4.jpg" alt="" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10 ">
                                <div className="block-content text-center front-p">
                                    <h1 className="uppercase">How will it work?</h1>
                                    <p className="lead">First a user must create an account, just like they do on every other social media site. Then, that user will create a profile, add pictures, and upload music. And then, interact with the news feed of Culture...</p>
                                    <p className="lead mt-2">Here's where the mathematics get involved. Each user starts with a set number of likes that they can give to other people's posts. These likes add up: about 10 likes equal 1 penny. Only rules are that you can't like your own posts and you can only like each post once...</p>
                                    <p className="lead mt-2">Later, The Culture Dapp will add levels to the game that activate advance features, like "Going Live", "Collaborations" and "NFTs". Also there will be "Word of Mouth" referral system that will pay out rewards for bringing users to the Culture Dapp. But for now, get active. This is our new way of life.</p>
                                    <div className="countdown uppercase  mb-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="band" className="band main ">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-9">
                                <div className="block-content text-center gap-one-bottom-md">
                                    <div className="block-title ">
                                        <h1 className="uppercase">Band members</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-lg-4">
                                <div className="block-member">
                                    <img src="img/5.jpg" alt="" />
                                    <div className="member-info">
                                        <h6 className="uppercase mb-0 ">Joe Walker</h6>
                                        <span className=" mt-0"> Lead vocals,guitars</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <div className="block-member">
                                    <img src="img/6.jpg" alt="" />
                                    <div className="member-info">
                                        <h6 className="uppercase mb-0 ">Andrew Smith</h6>
                                        <span className=" mt-0"> Lead guitar, bass guitar</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <div className="block-member">
                                    <img src="img/7.jpg" alt="" />
                                    <div className="member-info">
                                        <h6 className="uppercase mb-0 ">Jeremy Anderton</h6>
                                        <span className=" mt-0">Drums, keyboards</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="tour" className="tour  main bg-secondary2">
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-12 col-md-10 col-lg-9">
                                <div className="block-content  gap-one-bottom-md text-center">
                                    <div className="block-title ">
                                        <h1 className="uppercase">Upcoming tours</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-12 col-lg-8 col-md-10">
                                <ul className="block-tabs list-inline gap-one-bottom-sm text-center">
                                    <li className="active list-inline-item">
                                        <h5 className="uppercase  mb-0">american tour</h5>
                                    </li>
                                    <li className="list-inline-item">
                                        <h5 className="uppercase  mb-0">europeen tour</h5>
                                    </li>
                                </ul>
                                <ul className="block-tab">
                                    <li className="active ">
                                        <div className="block-content text-center">
                                            <div className="block-video">
                                                <img src="img/8.jpg" className="background-img mb-0" alt="" />
                                                <a className="video-play-but popup-youtube" href="https://www.youtube.com/watch?v=Gc2en3nHxA4"></a>
                                                <div className="embed-responsive embed-responsive-16by9">
                                                </div>
                                            </div>
                                            <p className=" mt-3"><span className="opc-70">The American Tour 2018 -</span> <a className="link" href="#">Booking Enqueries</a> </p>
                                        </div>
                                        <div className="block-content gap-one-top-sm text-left">
                                            <div className="block-content ">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3">
                                                        <h4 className="switch-fot">14 Mar</h4>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <h6 className="mb-0 opc-70 uppercase">Melbourne, AU</h6>
                                                        <span>Rod Laver Arena </span>
                                                    </div>
                                                    <div className="col-12 col-lg-5 col-md-5 text-md-right">
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico border-2" href="#"><i className="icon-ticket"></i>Vip</a>
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico" href="#"><i className="icon-ticket"></i>Buy Ticket</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="block-content ">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3">
                                                        <h4 className="switch-fot">10 Apr</h4>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <h6 className="mb-0 opc-70 uppercase">Washington, DC, USA</h6>
                                                        <span>Capital One Arena</span>
                                                    </div>
                                                    <div className="col-12 col-lg-5 col-md-5 text-md-right">
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico" href="#"><i className="icon-ticket"></i>Buy Ticket</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="block-content ">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3">
                                                        <h4 className="switch-fot">24 May</h4>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <h6 className="mb-0 opc-70 uppercase">Houston, TX, USA</h6>
                                                        <span>Arena Theatre</span>
                                                    </div>
                                                    <div className=" col-12 col-lg-5 col-md-5 text-md-right">
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico border-2" href="#"><i className="icon-ticket"></i>Vip</a>
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico" href="#"><i className="icon-ticket"></i>Buy Ticket</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="block-content">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3">
                                                        <h4 className="switch-fot">31 Jun</h4>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <h6 className="mb-0 opc-70 uppercase">Chicago, IL, USA</h6>
                                                        <span>United Center</span>
                                                    </div>
                                                    <div className="col-12 col-lg-5 col-md-5 text-md-right">
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico" href="#"><i className="icon-ticket"></i>Buy Ticket</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="block-content text-center">
                                            <div className="block-video">
                                                <img src="img/9.jpg" className="background-img mb-0" alt="" />
                                                <a className="video-play-but popup-youtube" href="https://www.youtube.com/watch?v=Gc2en3nHxA4" ></a>
                                                <div className="embed-responsive embed-responsive-16by9">
                                                </div>
                                            </div>
                                            <p className=" mt-3"><span className="opc-70">The Europeen Tour 2018 -</span> <a className="link" href="#">Booking Enqueries</a> </p>
                                        </div>
                                        <div className="block-content gap-one-top-sm text-left">
                                            <div className="block-content ">
                                                <div className="row ">
                                                    <div className="col-lg-3 col-md-3">
                                                        <h4 className="switch-fot">24 Jul</h4>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <h6 className="mb-0 opc-70 uppercase">Stockholm, Sweden</h6>
                                                        <span>Annexet</span>
                                                    </div>
                                                    <div className="col-12 col-lg-5 col-md-5 text-md-right">
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico" href="#"><i className="icon-ticket"></i>Buy Ticket</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="block-content ">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3">
                                                        <h4 className="switch-fot">16 Aug</h4>
                                                    </div>
                                                    <div className=" col-lg-4 col-md-4">
                                                        <h6 className="mb-0 opc-70 uppercase">Berlin, Germany</h6>
                                                        <span>Mercedes-Benz Arena</span>
                                                    </div>
                                                    <div className="col-12 col-lg-5 col-md-5 float-left text-md-right">
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico" href="#"><i className="icon-ticket"></i>Buy Ticket</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="block-content ">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3">
                                                        <h4 className="switch-fot">24 Sep</h4>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <h6 className="mb-0 opc-70 uppercase">Monterrey, Mexico</h6>
                                                        <span>Machaca </span>
                                                    </div>
                                                    <div className="col-12 col-lg-5 col-md-5 text-md-right">
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico border-2" href="#"><i className="icon-ticket"></i>Vip</a>
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico" href="#"><i className="icon-ticket"></i>Buy Ticket</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="block-content">
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-3">
                                                        <h4 className="switch-fot">31 Oct</h4>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4">
                                                        <h6 className="mb-0 opc-70 uppercase">Moscow, Russia</h6>
                                                        <span>Olimpiyskiy</span>
                                                    </div>
                                                    <div className="col-12 col-lg-5 col-md-5 text-md-right">
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico border-2" href="#"><i className="icon-ticket"></i>Vip</a>
                                                        <a className="btn-s uppercase btn btn-primary btn-primary2 with-ico" href="#"><i className="icon-ticket"></i>Buy Ticket</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12  col-lg-8   col-md-10">
                                <div className="block-content  gap-one-top-sm">
                                    <div className="card  border-dashed">
                                        <div className="card-body p-5 block-subscribe ">
                                            <p className="uppercase text-center mb-4">Subscribe for free downloads and <br />band news updates</p>
                                            <form method="get">
                                                <div className="form-row justify-content-center">
                                                    <div className="col-12 col-md-9 col-lg-8">
                                                        <div className="form-group">
                                                            <input className="form-controle form-control-lg" name="email" placeholder="Email Address..." type="email" />
                                                            <span className="text-small mt-2">* We don’t share your information with anyone.</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <button type="submit" className="btn  btn-primary btn-primary2 uppercase border-3">
                                                            Subscribe now</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="divider overlay">
                    <div className="background-img">
                        <img src="img/24.jpg" alt="" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10 ">
                                <div className="block-content text-center front-p">
                                    <h1 className="uppercase">
                                        PRE-SALE OF 'THE upcoming TOUR' </h1>
                                    <div className="block-presale mt-5">
                                        <ul>
                                            <li><h5 className="uppercase list-inline-item">Pre-Sale Tour 1 :</h5> <span>2/07 - 2/09</span></li>
                                            <li><h5 className=" uppercase list-inline-item">Pre-Sale Tour 1 :</h5> <span>2/14 - 2/16</span></li>
                                        </ul>
                                        <p className=" opc-70 mb-0">All pre-sales begin 12am local and end 6pm local time.</p>
                                    </div>
                                    <a className="btn btn-primary btn-primary2 uppercase with-ico border-2 mt-5" href="#">Click for more info</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="gallery" className="gallery main">
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-12 col-md-10 col-lg-9">
                                <div className="block-content  gap-one-bottom-md text-center">
                                    <h1 className="uppercase indent">Upcoming tours</h1>
                                    <i className="icon-camera-7 big-icon adjust-space "></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-12 ">
                                <div className="card-gallery image-gallery">
                                    <a href="img/10.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/10.jpg" /></a>
                                    <a href="img/11.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/11.jpg" /></a>
                                    <a href="img/12.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/12.jpg" /></a>
                                    <a href="img/13.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/13.jpg" /></a>
                                    <a href="img/20.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/20.jpg" /></a>
                                    <a href="img/14.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/14.jpg" /></a>
                                    <a href="img/15.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/15.jpg" /></a>
                                    <a href="img/16.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/16.jpg" /></a>
                                    <a href="img/17.jpg" className="popup-image mb-0"><img className="animated" alt="" src="img/17.jpg" /></a>
                                </div>
                                <a className="btn btn-primary btn-primary2 uppercase with-ico mt-5" href="#"><i className="icon-instagram"></i>Follow us @Music</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="news" className="news main bg-secondary2">
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-12 col-md-10 col-lg-9">
                                <div className="block-content  gap-one-bottom-md text-center">
                                    <div className="block-title ">
                                        <h1 className="uppercase">On the blog</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <ul className="news-list">
                            <li className="row align-items-center justify-content-around">
                                <div className="col-12 col-md-6 order-md-2">
                                    <div className="block-content">
                                        <a href="#"><img alt="" className="img-fluid animated" src="img/18.jpg" /></a>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-5  order-md-1 ">
                                    <div className="block-content text-left">
                                        <span className="mb-2 opc-70">Nov 10, 2017</span>
                                        <h2 >New Single “Por Favor” feat. Fifth Harmony Out Now!</h2>
                                        <p className="lead">
                                            Melbourne is the coastal capital of the southeastern Australian state of Victoria. At the city's centre is the modern Federation Square development, with plazas, bars, and restaurants by the Yarra River.
                                        </p>
                                        <a href="#">Read more ›</a>
                                    </div>
                                </div>
                            </li>
                            <li className="row align-items-center justify-content-around">
                                <div className="col-12 col-md-6 order-1">
                                    <div className="block-content">
                                        <a href="#"><img alt="" className="img-fluid animated" src="img/19.jpg" /></a>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-5  order-2 text-left">
                                    <div className="block-content text-left">
                                        <span className="mb-2 opc-70">Nov 10, 2017</span>
                                        <h2>Watch The Official Video for “Options” ft. Stephen Marley</h2>
                                        <p className="lead">
                                            Melbourne is the coastal capital of the southeastern Australian state of Victoria. At the city's centre is the modern Federation Square development, with plazas, bars, and restaurants by the Yarra River.
                                        </p>
                                        <a href="#">Read more ›</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="block-content text-center">
                            <a className="btn btn-primary btn-primary2 with-ico uppercase mt-5 " href="#">
                                View all blog posts</a>
                        </div>
                    </div>
                </section>
                {/* <section className="twitter main bg-secondary2">
                    <h1 className="uppercase indent">Upcoming tours</h1>
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-12 col-md-10 col-lg-9">
                                <div className="block-content  text-center">
                                    <i className="icon-twitter big-icon adjust-space"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-7 col-lg-6">
                                <div className=" tweets mb-5 text-center">
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
                <section id="contact" className="contact main bg-secondary2">
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-12 col-md-10 col-lg-9">
                                <div className="block-content  gap-one-bottom-md text-center">
                                    <div className="block-title ">
                                        <h1 className="uppercase">stay in touche</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-lg-10">
                                <ul className="feature-list feature-list-sm text-center row">
                                    <li className="col-md-6  col-lg-4">
                                        <div className="card text-center" style={{ background: 'transparent', boxShadow: 'none' }}>
                                            <div className="card-body">
                                                <h2 className="uppercase ">Booking</h2>
                                                <p className="mb-0"><em className="uppercase h5 opc-70">Benaissa Ghrib</em>
                                                    T+(513)352-3209<br />
                                                    booking@Music.net
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-md-6  col-lg-4">
                                        <div className="card text-center" style={{ background: 'transparent', boxShadow: 'none' }}>
                                            <div className="card-body">
                                                <h2 className="uppercase">Press</h2>
                                                <p className="mb-0"><em className="uppercase h5 opc-70">Zakaria Kalal</em>
                                                    T+(513)352-3209<br />
                                                    press@Music.net
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-md-6  col-lg-4">
                                        <div className="card text-center" style={{ background: 'transparent', boxShadow: 'none' }}>
                                            <div className="card-body">
                                                <h2 className="uppercase ">info</h2>
                                                <p className=" mb-0"><em className="uppercase h5 opc-70">Youssef Ait</em>
                                                    T+(513)352-3209<br />
                                                    info@Music.net
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <ul className="block-social list-inline text-center mt-4">
                                    <li className="list-inline-item">
                                        <a href="#"> <i className="socicon-facebook"></i> </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="socicon-instagram"></i> </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="socicon-twitter"></i> </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="socicon-youtube"></i> </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="socicon-apple"></i> </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="socicon-amazon"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <a className="block-top scroll" href="#wrapper">
                    <i className="icon-angle-up"></i></a>
            </div>
        </Aux>
    );
};

export default Home;
