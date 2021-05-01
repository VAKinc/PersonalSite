import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import NavMenuSP from './widgets/NavMenuSP';
import NavMenuPC from './widgets/NavMenuPC';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <NavMenuPC />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/projects">
                        <Projects />
                    </Route>
                    <Route path="/skills">
                        <Skills />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route path="*">
                        <h1>Page not found!</h1>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
