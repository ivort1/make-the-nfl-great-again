export default {
    name: 'announcement',
    type: 'document',
    title: 'Announcement',
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
        name: 'pin',
        type: 'boolean',
        title: 'Pin'
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
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [
          {
            type: 'block',
          },
          {
            type: 'image',
            fields: [
              {
                type: 'text',
                name: 'alt',
                title: 'Alternative Text',
              },
            ],
          },
        ],
      }
    ]
  }