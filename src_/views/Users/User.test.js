import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { mount } from 'enzyme'
import sujet from './User';


it('renders without crashing', () => {
  const wrapper = mount(
    <MemoryRouter>
      <sujet match={{params: {id: "1"}, isExact: true, path: "/sujet/:id", name: "Sujet details"}}/>
    </MemoryRouter>
  );
  expect(wrapper.containsMatchingElement(<strong>Samppa Nori</strong>)).toEqual(true)
  wrapper.unmount()
});
