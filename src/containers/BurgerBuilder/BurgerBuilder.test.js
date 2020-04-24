import React from 'react';
import {configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter : new Adapter()});

describe('<NavigationItems />' , () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitingredients={() => {}}/>);
    })
    it('should render build controls when receiving ingredients', () => {
        wrapper.setProps({ings :{salad : 0} });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
        });

});