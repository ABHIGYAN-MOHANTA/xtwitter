## Get Started

1. Clone the repository:

   ```sh
   git clone https://github.com/ABHIGYAN-MOHANTA/xtwitter
   ```

2. Navigate to the project directory:

   ```sh
   cd xtwitter
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the application:

   ```sh
   npm start
   ```

5. Open a new terminal window.

6. Make a POST request to scrape a tweet using `curl`:

   ```sh
   curl -X POST -H "Content-Type: application/json" -d '{"tweetUrl":"https://twitter.com/diego6_nava/status/1688728796495511560"}' http://localhost:3000/scrape
   ```

7. Change the `tweetUrl` in the JSON body to extract the content from a different tweet. The `tweetUrl` should be in the specified format "https://twitter.com/{username}/status/{somenumber}"

8. Here is the request with Postman:
   ![Screenshot from 2023-08-08 12-43-07](https://github.com/ABHIGYAN-MOHANTA/xtwitter/assets/110360901/55b46c07-20a6-4843-85a3-a9f2f9994bb6)

9. This is what you should receive:

```json
{
    "tweetUrl": "https://twitter.com/FrancescoCiull4/status/1688785447499988992",
    "data": [
        {
            "username": "@FrancescoCiull4",
            "profilePic": "https://pbs.twimg.com/profile_images/1617044903636123650/pYUcGGOu_normal.jpg",
            "tweet": "Another 10km run \n\nI want to connect with more \ndevelopers who take care of their health.\n\nWhere are them?read image descriptionALT",
            "emojis": [
                "https://abs-0.twimg.com/emoji/v2/svg/1f45f.svg"
            ],
            "images": [
                "https://pbs.twimg.com/media/F2_FZ3eXMAAYVY8?format=jpg&name=small"
            ],
            "time": "11:03 am",
            "date": "8 Aug 2023",
            "stats": [
                "19.7K Views",
                "1 Retweet",
                "1 Quote",
                "283 Likes"
            ]
        }
    ]
}
```
