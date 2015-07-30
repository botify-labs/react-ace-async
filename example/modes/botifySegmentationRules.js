export default function(aceRequire) {
  const oop = aceRequire('ace/lib/oop');
  const TextHighlightRules = aceRequire('ace/mode/text_highlight_rules').TextHighlightRules;


  const BotifySegmentationRules = function() {

    this.$rules = {
      start: [
        {
          token: 'comment',
          regex: '#',
          next: 'globalComment',
        },
        {
          token: 'text',
          regex: '\\s+|^$',
          next: 'start',
        },
        {
          token: ['punctuation.operator', 'storage.type', 'keyword.operator', 'variable', 'punctuation.operator'],
          regex: /^(\[)(dim|segmentation)(:)([a-zA-Z]+)(\])$/,
          next: 'segmentationDef',
        },
      ],
      globalComment: [
        {
          token: 'comment',
          regex: '$|^',
          next: 'start',
        },
        {
          defaultToken: 'comment',
          caseInsensitive: true,
        },
      ],
      segmentationDef: [
        {
          token: ['storage.type', 'variable'],
          regex: /^(@)([a-zA-z0-9\/]+)$/,
          next: 'segmentDef',
        },
        {
          token: 'comment',
          regex: '#',
          next: 'segmentationComment',
        },
        {
          token: ['punctuation.operator', 'storage.type', 'keyword.operator', 'variable', 'punctuation.operator'],
          regex: /^(\[)(dim|segmentation)(:)([a-zA-Z]+)(\])$/,
          next: 'segmentationDef',
        },
      ],
      segmentationComment: [
        {
          token: 'comment',
          regex: '$|^',
          next: 'segmentationDef',
        },
        {
          defaultToken: 'comment',
          caseInsensitive: true,
        },
      ],
      segmentDef: [
        {
          token: ['keyword', 'text', 'string'],
          regex: /^(host)(\s)([a-zA-z0-9\.]+)$/,
        },
        {
          token: ['keyword', 'text', 'string.regexp'],
          regex: /^(path)(\s)([a-zA-z0-9\/\-\*]+)$/,
        },
        {
          token: ['keyword', 'text', 'string.regexp'],
          regex: /^(query)(\s)([a-zA-z0-9\/]+)$/,
        },
        {
          token: 'empty',
          regex: '^$',
          next: 'segmentationDef',
        },
      ],
    };
  };
  oop.inherits(BotifySegmentationRules, TextHighlightRules);

  return BotifySegmentationRules;
}
