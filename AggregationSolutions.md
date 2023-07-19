### Exercise:

1. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        name: /Reg/,
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _Id: 1,
        name: 1,
        borough: 1,
        cuisine: 1,
      },
  },
]

2. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        borough: "Bronx",
        $or: [
          {
            cuisine: "American",
          },
          {
            cuisine: "Chinese",
          },
        ],
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _Id: 1,
        name: 1,
        borough: 1,
        cuisine: 1,
      },
  },
]

3. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        borough: {
          $in: [
            "Staten Island",
            "Queens",
            "Bronx",
            "Brooklyn",
          ],
        },
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _Id: 1,
        name: 1,
        borough: 1,
        cuisine: 1,
      },
  },
]

4. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronx or Brooklyn.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        borough: {
          $nin: [
            "Staten Island",
            "Queens",
            "Bronx",
            "Brooklyn",
          ],
        },
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _Id: 1,
        name: 1,
        borough: 1,
        cuisine: 1,
      },
  },
]

5. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        "grades.score": {
          $lte: 10,
        },
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _Id: 1,
        name: 1,
        borough: 1,
        cuisine: 1,
        restaurant_id: 1,
      },
  },
]

6. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinese' or restaurant's name begins with letter 'Wil'.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        $or: [
          {
            cuisine: {
              $nin: ["American", "Chinese"],
            },
          },
          {
            name: {
              $regex: /^Wil/i,
            },
          },
        ],
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _Id: 1,
        name: 1,
        borough: 1,
        cuisine: 1,
        restaurant_id: 1,
      },
  },
]

7. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        $and: [
          {
            "grades.grade": "A",
          },
          {
            "grades.score": 11,
          },
          {
            "grades.date": ISODate(
              "2014-08-11T00:00:00Z"
            ),
          },
        ],
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _Id: 1,
        name: 1,
        grades: 1,
        restaurant_id: 1,
      },
  },
]

8. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        "grades.1.grade": "A",
        "grades.1.score": 9,
        "grades.1.date": ISODate(
          "2014-08-11T00:00:00Z"
        ),
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _id: 1,
        name: 1,
        grades: {
          $filter: {
            input: "$grades",
            cond: {
              $and: [
                {
                  $eq: ["$$this.grade", "A"],
                },
                {
                  $eq: ["$$this.score", 11],
                },
                {
                  $eq: [
                    "$$this.date",
                    ISODate(
                      "2014-08-11T00:00:00Z"
                    ),
                  ],
                },
              ],
            },
          },
        },
      },
  },
]

9. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        "address.coord.1": {
          $gt: 42,
          $lte: 52,
        },
      },
  },
  {
    $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _id: 1,
        name: 1,
        address: 1,
        location: {
          type: "Point",
          coordinates: "$address.coord",
        },
      },
  },
]

10. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.

#### Solution:
[
  {
    $sort:
      /**
       * query: The query in MQL.
       */
      {
        name: 1,
      },
  },
]

11. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.

#### Solution:
[
  {
    $sort:
      /**
       * query: The query in MQL.
       */
      {
        name: -1,
      },
  },
]

12. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.

#### Solution:
[
  {
    $sort:
      /**
       * query: The query in MQL.
       */
      {
        cuisine: 1,
        borough: -1,
      },
  },
]

13. Write a MongoDB query to know whether all the addresses contains the street or not.

#### Solution:
[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        address: {
          $not: {
            $elemMatch: {
              street: {
                $exists: false,
              },
            },
          },
        },
      },
  },
]