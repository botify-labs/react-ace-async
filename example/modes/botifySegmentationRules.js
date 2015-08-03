export default function(aceRequire) {
  const TextHighlightRules = aceRequire('ace/mode/text_highlight_rules').TextHighlightRules;


  let segmentation = {
    token: ['punctuation.operator', 'storage.type', 'keyword.operator', 'variable', 'punctuation.operator'],
    regex: /^(\[)(.+)(:)(.+)(\])$/,
    next: 'segmentationDef',
  };

  let segmentName = {
    token: ['storage.type', 'variable'],
    regex: /^(@)(.+)$/,
    next: 'segmentDef',
  };

  let segmentDefValue = {
    token: ['keyword', 'text', 'string'],
    regex: /^(.+)(\s)(.+)$/,
  };

  let segmentDefValueModified = {
    token: ['keyword', 'text', 'support.function', 'string'],
    regex: /^(.+)(\s)(.+:)(.+)$/,
  };

  let segmentDefModifierAndValue = {
    token: ['keyword', 'text', 'support.function', 'text', 'string'],
    regex: /^(.+)(\s)(.+)(\s)(.+)$/,
  };

  let segmentDefModifierAndValueModified = {
    token: ['keyword', 'text', 'support.function', 'text', 'support.function', 'string'],
    regex: /^(.+)(\s)(.+)(\s)(.+:)(.+)$/,
  };

  class BotifySegmentationRules extends TextHighlightRules {

    $rules = {
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
        segmentation,
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
        segmentName,
        {
          token: 'comment',
          regex: '#',
          next: 'segmentationComment',
        },
        segmentation,
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
        segmentDefModifierAndValueModified,
        segmentDefModifierAndValue,
        segmentDefValueModified,
        segmentDefValue,
        {
          token: 'empty',
          regex: '^$',
          next: 'segmentationDef',
        },
      ],
    };
  }

  return BotifySegmentationRules;
}
