'use babel';

import SlotMahjongView from './slot-mahjong-view';
import { CompositeDisposable } from 'atom';

export default {

  slotMahjongView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotMahjongView = new SlotMahjongView(state.slotMahjongViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotMahjongView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-mahjong:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotMahjongView.destroy();
  },

  serialize() {
    return {
      slotMahjongViewState: this.slotMahjongView.serialize()
    };
  },

  toggle() {
    console.log('SlotMahjong was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
