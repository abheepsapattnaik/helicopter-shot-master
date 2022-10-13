import {NextPlayerSelectionModal} from "./NextPlayerSelectionModal";
import {mount} from "enzyme";
import React from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";

describe('NextPlayerSelectionModal', function () {
  it('should render the list of players', function () {
    const props = {
      players: [
        {
          name: 'Player 1.1',
          isPlaying: false
        },
        {
          name: 'Player 1.2',
          isPlaying: false
        },
        {
          name: 'Player 1.3',
          isPlaying: false
        },
        {
          name: 'Player 1.4',
          isPlaying: false
        }
      ],
      onSelectHandler: jest.fn(),
      open: true,
      classes: {}
    };
    const nextPlayerSelectionTag = mount(<NextPlayerSelectionModal {...props}/>);
    const listItemTags = nextPlayerSelectionTag.find(ListItem);
    listItemTags.at(0).simulate('click');
    listItemTags.at(1).simulate('click');
    expect(listItemTags.length).toBe(4);
    expect(listItemTags.at(0).text()).toBe('Player 1.1');
    expect(listItemTags.at(1).text()).toBe('Player 1.2');
    expect(listItemTags.at(2).text()).toBe('Player 1.3');
    expect(listItemTags.at(3).text()).toBe('Player 1.4');
    expect(props.onSelectHandler).toHaveBeenCalledTimes(2);
    expect(props.onSelectHandler).toHaveBeenLastCalledWith(props.players[1].name, props.teamName);
  });

  it('should render the list of players', () => {
    const players = [
      {
        name: 'Player 1.1',
        isPlaying: false
      },
      {
        name: 'Player 1.2',
        isPlaying: false
      }
    ];

    const props = {
      players,
      open: true,
      classes:{}
    };

    const nextPlayerSelectionTag = mount(<NextPlayerSelectionModal {...props}/>);
    const listItemTags = nextPlayerSelectionTag.find(ListItem);
    expect(listItemTags.length).toBe(2);
    expect(listItemTags.at(0).text()).toBe('Player 1.1');
    expect(listItemTags.at(1).text()).toBe('Player 1.2');
  });
});
