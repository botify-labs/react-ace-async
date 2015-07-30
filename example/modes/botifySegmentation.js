import botifySegmentationsRules from './botifySegmentationRules';


export default function(aceRequire) {
  const TextMode = aceRequire('ace/mode/text').Mode;


  class BotifySegmentationMode extends TextMode {
    HighlightRules = botifySegmentationsRules(aceRequire);
    static lineCommentStart = '##';
  }

  return BotifySegmentationMode;
}
