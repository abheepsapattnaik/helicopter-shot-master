import React from "react";
import {withStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

const styles = {
  dialog: {
    margin: 'auto',
    maxHeight: 400,
  }
};

export const NextPlayerSelectionModal = (props) => (
  <Dialog
    open={props.open}
    onClose={() => props.open}
    className={props.classes.dialog}
  >
    <DialogTitle variant='h5'>
      Select next {props.playerType}
    </DialogTitle>
    <DialogContent>
      <List>
        {props.players.map((player, index) =>
          <ListItem button key={index}
                    onClick={() => props.onSelectHandler(player.name, props.teamName)}
          >
            {player.name}
          </ListItem>
        )}
      </List>
    </DialogContent>
  </Dialog>
);

export default withStyles(styles)(NextPlayerSelectionModal);