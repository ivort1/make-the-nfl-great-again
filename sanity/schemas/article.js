// schemas/pet.js
export default {
    name: 'article',
    type: 'document',
    title: 'Article',
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