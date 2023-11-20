import { Link, Head } from '@inertiajs/react';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import {loadFull} from 'tsparticles'
export default function Welcome({ auth}) {
  const particlesInit = useCallback(engine => {
    console.log(engine);
    loadFull(engine);
  }, []);
    return (
        <>
            <Head title="Welcome" />
              <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-blue-500 dark:text-gray-400 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
              </div>
             
            <div className='container'> 
            <div id="infinity">AI Pictures</div>
            <Link href={route('login')}>
            <button className="button-12">Log in</button>
            </Link>
            <Link  href={route('register')}>
            <button className="button-12">Register</button>
            </Link>
            <Link href={route('scoreboard')} className="button-12">Scoreboard</Link>
            </div>
            <div className="particles-container">
            <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: {
                  enable: true,
                  zIndex: -10,
                },
                background: {
                    color: {
                        value: "#0d47a1",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
        </div> 
            <style>{`
 */
/* Exo thin font from Google. */
@import url(https://fonts.googleapis.com/css?family=Exo:100);
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
  font: 400 16px/1.5 exo, ubuntu, "segoe ui", helvetica, arial, sans-serif;
  text-align: center;
}

#infinity {
  font-size: 8rem;
  font-weight: 100;
  font-style: normal;
}
.button-12 {
  font-size: 4rem;
  display: block;
  flex-direction: column;
  align-items: center;
  padding: 10px 100px;
  width: 500px;
  margin: .5em;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  border-radius: 15px;
  border: none;

  background: #3B82F6;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
  color: #DFDEDF;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-12:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}
            `}</style>
        </>
    );
}
