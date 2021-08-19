import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from './features/home/Home';
import About from './features/about/About';
import Projects from './features/projects/Projects';
import Skills from './features/skills/Skills';
import Contact from './features/contact/Contact';
import NavMenuSP from './common/nav/NavMenuSP';
import NavMenuPC from './common/nav/NavMenuPC';

const App: React.FC = () => {
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

export default App;