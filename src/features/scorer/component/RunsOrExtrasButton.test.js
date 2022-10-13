import React from 'react';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import {getChipColor, RunsOrExtrasButton} from './RunsOrExtrasButton';
import {mount} from "enzyme";

describe('RunsOrExtraButton', () => {
  describe('for Runs', () => {
    it('should return render props if button value is 1', () => {
      const props = {
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: '1.1'
        },
        value: 1
      };
      const RunExtraButtonTag = mount(
        <RunsOrExtrasButton
          classes={{}}
          {...props}
        />
      );
      const chipTag = RunExtraButtonTag.find(Chip);
      expect(chipTag.text()).toBe(props.value.toString());
    });

    it('should return render props if button value is 2', () => {
      const props = {
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: '1.1'
        },
        value: 2
      };
      const RunExtraButtonTag = mount(
        <RunsOrExtrasButton
          classes={{}}
          {...props}
        />
      );
      const chipTag = RunExtraButtonTag.find(Chip);
      expect(chipTag.text()).toBe(props.value.toString());
    });

    it('should store the runs if run button 2 is clicked', () => {
      const props = {
        scoreUpdater: jest.fn(),
        value: 2,
        classes: {},
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: 'Player 1.1'
        },
      };
      const RunExtraButtonTag = mount(
        <RunsOrExtrasButton
          {...props}
        />);
      RunExtraButtonTag.find(Chip).simulate('click');
      expect(props.scoreUpdater).toHaveBeenCalledWith(props.value);
    });

  });

  describe('for Extras', () => {
    it('should return render props if button value is Wd', () => {
      const props = {
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: '1.1'
        },
        value: 'Wd'
      };
      const RunExtraButtonTag = mount(
        <RunsOrExtrasButton
          classes={{}}
          {...props}
        />
      );
      const chipTag = RunExtraButtonTag.find(Chip);
      expect(chipTag.text()).toBe("Wd");
    });

    it('should return render props if button value is Nb', () => {
      const props = {
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: '1.1'
        },
        value: 'Nb',
      };
      const RunExtraButtonTag = mount(
        <RunsOrExtrasButton
          classes={{}}
          {...props}
        />
      );
      const chipTag = RunExtraButtonTag.find(Chip);
      expect(chipTag.text()).toBe("Nb");
    });

    it('should store the extra as Nb if extra button N is clicked', () => {
      const props = {
        scoreUpdater: jest.fn(),
        value: 'Nb',
        classes: {},
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: 'Player 1.1'
        }
      };
      const RunExtraButtonTag = mount(
        <RunsOrExtrasButton
          {...props}
        />);
      RunExtraButtonTag.find(Chip).simulate('click');
      expect(props.scoreUpdater).toHaveBeenCalledWith(props.value);
    });
  });

  describe('getChipColor', () => {
    it('should return the color change of button when a batsman or run is selected', () => {
      const props = {
        currentBall: {
          run: 1,
          extras: [],
          batsmanName: 'Player 1.1'
        },
        value: 1
      };
      expect(getChipColor(props.value, props.currentBall)).toBe('primary');
    });

    it('should return the color change of button when a batsman or run is not selected', () => {
      const props = {
        currentBall: {
          run: 0,
          extras: [],
          batsmanName: 'Player 1.1'
        },
        value: 2
      };
      expect(getChipColor(props.value, props.currentBall)).toBe('default');
    });

    it('should change the color of extra button to primary when clicked and extras array has not same value', () => {
      const props = {
        currentBall: {
          run: 0,
          extras: ['Nb'],
          batsmanName: 'Player 1.1'
        },
        value: 'Nb'
      };
      expect(getChipColor(props.value, props.currentBall)).toBe('primary');
    });
  });
});