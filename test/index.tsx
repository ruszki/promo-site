import { expect } from "chai";
import * as React from "react";
import { shallow } from "./utils/enzyme";
import ComponentMock from "./mocks/ComponentMock";
import * as AppInjector from "inject-loader!@app";
import AppReal from "@app";

const ColoredDiv = ComponentMock("ColoredDiv");

const App = AppInjector({
    "./ColoredDiv": {
        default: ColoredDiv
    }
}).default;

describe("<App />", () => {
    it("should render a <ColoredDiv />", () => {
        const AppWrapper = shallow(<App />);

        AppWrapper.find(ColoredDiv).length.should.equals(1);
    });
});
