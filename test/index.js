import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

var testsContext = require.context("./app/", true, /^.+\.tsx?$/);
testsContext.keys().forEach(testsContext);

var components = require.context("../app/", true, /^((.*[^d])|(d)|(.*[^\.]d))\.tsx?$/);
components.keys().forEach(components);
