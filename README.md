# Internship Assessment

## Overview
The scraping strategy works in the following steps:
- First we get all the divs with `.social-details-social-counts__social-proof-text` or `social-details-social-counts__reactions-count` classes. I realized that these were the two different kinds of classes used to identify the link to open the reactors modal for a certain post. They have very subtle differences. If need be, we can extract all the links with these two classes separately two get all the posts. For this case, we get all of the divs with these two classes and just pick the first one among them. This might not necessarily mean it is the first post in the feed.
- We open the reactors modal to load and show the people who reacted on the post. This modal is loaded asynchronously so we have to wait for the content to load. For this, we use the `MutationObserver` interface. The utility function is adopted from [this tutorial](https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists).
- After loading, we look for the total number of reactors which is available in the modal.
- We keep iterating until the number of people in the list is not equal to the number of total reactors shown in top of the modal.
- We gather names with different strategies since the structure of the reactor div is different for a personal profile vs a page.
- If we notice that the number of reactors in the list hasn't reached the total number of reactors, but the "Show More" button is not present (seemed to happen in some cases), we break out of the loop and stop looking for more.
- We give a buffer time of 1 second between loops.
- In the end, we iterate over the final reactors list and print it out on alert.