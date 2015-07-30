import botifySegmentationsRules from './botifySegmentationRules';


export default function(aceRequire) {
  const oop = aceRequire('ace/lib/oop');
  const TextMode = aceRequire('ace/mode/text').Mode;


  const BotifySegmentationMode = function() {
    this.HighlightRules = botifySegmentationsRules(aceRequire);
  };
  oop.inherits(BotifySegmentationMode, TextMode);

  (function() {
    this.lineCommentStart = '##';
  }).call(BotifySegmentationMode.prototype);

  return new BotifySegmentationMode();
}


