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
   ![Screenshot](https://github.com/ABHIGYAN-MOHANTA/xtwitter/assets/110360901/c4618652-8767-4abd-b70b-c6644290fbb7)

9. This is what you should receive:

```json
{
  "tweetUrl": "https://twitter.com/diego6_nava/status/1688728796495511560",
  "data": [
    {
      "username": "@diego6_nava",
      "profilePic": "https://pbs.twimg.com/profile_images/1642051168955187202/uETzWDAU_normal.jpg",
      "tweet": "1,000 followers!\n\nThank you, everyone!\n\nI began in April this year. I figured it'd take until December, but your support helped me do it in 4 months!\n\nThis #buildinpublic journey has been incredible, thanks to each of you!",
      "emojis": [
        "https://abs-0.twimg.com/emoji/v2/svg/1f525.svg",
        "https://abs-0.twimg.com/emoji/v2/svg/1f64f-1f3fd.svg"
      ],
      "images": [
        "https://pbs.twimg.com/media/F2-QuNiW8AAc2Cx?format=jpg&name=small"
      ],
      "time": "7:18 am",
      "date": "8 Aug 2023",
      "stats": ["555 Views", "25 Likes"]
    }
  ]
}
```
