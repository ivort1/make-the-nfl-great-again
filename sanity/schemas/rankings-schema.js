export default {
    name: 'rankings',
    type: 'document',
    title: 'Power Rankings',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: 'title',
        },
      },
      {
        name: 'tags',
        type: 'string',
        title: 'Tag(s)',
      },
      {
        name: 'season',
        type: 'string',
        title: 'Season'
      },
      {
        name: 'Week',
        type: 'string',
        title: 'Week'
      },
      {
        name: 'Ranking_1',
        type: 'string',
        title: '1 - Ranking'
      },
      {
        name: 'Summary_1',
        type: 'text',
        title: '1 - Summary'
      },
      {
        name: 'Ranking_2',
        type: 'string',
        title: '2 - Ranking'
      },
      {
        name: 'Summary_2',
        type: 'text',
        title: '2 - Summary'
      },
      {
        name: 'Ranking_3',
        type: 'string',
        title: '3 - Ranking'
      },
      {
        name: 'Summary_3',
        type: 'text',
        title: '3 - Summary'
      },
      {
        name: 'Ranking_4',
        type: 'string',
        title: '4 - Ranking'
      },
      {
        name: 'Summary_4',
        type: 'text',
        title: '4 - Summary'
      },
      {
        name: 'Ranking_5',
        type: 'string',
        title: '5 - Ranking'
      },
      {
        name: 'Summary_5',
        type: 'text',
        title: '5 - Summary'
      },
      {
        name: 'Ranking_6',
        type: 'string',
        title: '6 - Ranking'
      },
      {
        name: 'Summary_6',
        type: 'text',
        title: '6 - Summary'
      },
      {
        name: 'Ranking_7',
        type: 'string',
        title: '7 - Ranking'
      },
      {
        name: 'Summary_7',
        type: 'text',
        title: '7 - Summary'
      },
      {
        name: 'Ranking_8',
        type: 'string',
        title: '8 - Ranking'
      },
      {
        name: 'Summary_8',
        type: 'text',
        title: '8 - Summary'
      },
      {
        name: 'Ranking_9',
        type: 'string',
        title: '9 - Ranking'
      },
      {
        name: 'Summary_9',
        type: 'text',
        title: '9 - Summary'
      },
      {
        name: 'Ranking_10',
        type: 'string',
        title: '10 - Ranking'
      },
      {
        name: 'Summary_10',
        type: 'text',
        title: '10 - Summary'
      }
    ]
  }