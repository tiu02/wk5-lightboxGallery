1) What did you build? Describe the feature in plain language.
- I chose to build a responsive image gallery with lightbox overlay. Clicking any thumbnails opens image in lightbox modal,
  which has buttons to close lightbox, arrow buttons to move between images, keyboard navigation support, CSS transitions and swipe gestures for mobile.
  
2) How did micro-iteration feel? Was working in small steps natural or frustrating? Why?
- Micro-iteration helps in terms of narrowing down scope and identifying bugs and errors at specific intervals. To me, it felt frustrating,
  since I tend to work on fixing one whole page at a time, not just focused on one feature. I also like seeing the whole picture first, and some CSS
  I couldn't test until later steps implemented the JS. However, it does make me slow down and assess the code more. Having Claude self review itself
  after each step made me learn about errors I didn't even know about, or better ways for the design to be accessible.

3) What did self-review catch? When you asked the AI to review its own code, what issues did it find? Give at least one specific example.
- When I asked Claude to review its own code, it discovered bugs mostly having to do with responsiveness and layout. For example, when I tried
  to resize the browser window to test responsiveness, I realized the image stretched wider within its wrapper, causing images to be cropped off.
  Addressing this issue, Claude proposed to change image heigh from fixed to an aspect ratio of 4/3 to avoid cropping on resize.

4) Tool impressions. What did you like or dislike about [Copilot Agent / Claude Web]?
- Claude Web is convenient in that it automates its own debugging after self review and pushing those commits to Github, instead of having to manually do it for
  every micro-iteration cycle. It's also good at identifying which bugs and issues have higher priority, and which can be fixed with the later steps.
  I also appreciate the summary table as well as the red text styling to signify the relevant elements and paths.

5) Self-review patterns. Did the AI consistently catch certain types of issues during self-review (e.g., edge cases, missing error handling)? Did it ever miss something you caught yourself?
- The AI consistently caught edge cases pertaining to accessibility and layout. For example, it noticed that pinch-to-zoom could trigger navigation, so it suggested a fix by adding touchstart guard
  and a touchend guard. Another example is it noticing the CSS styling for the image heights from previous steps weren't the best option anymore once captions came into play. From there, it suggested
  a flex layout to account for responsiveness with longer caption lengths. However, I noticed it missed a few things, such as the actual thumbnail and lightbox captions do not match the actual image
  at all, and neither was the initial font used readable. Since Claude couldn't access picsum.photos, I had to prompt a fix by including a screenshot of the image grid, and suggest a more readable font,
  with line length limit and bold font. I also noticed that Claude made the actual image in the lightbox modal too small, so I prompted it to fill more of the screen. Besides the CSS conflicts I noticed,
  Claude did well in self reviewing its own code for acesssibility gaps and flaws in logic between steps.
  
6) Browser tool vs. CLI comparison. If you’ve used Claude Code CLI or another terminal tool, how did the browser-based experience compare? What’s better/worse about each?
- Claude Web is convenient in that it requires no set up, so you can use it anywhere with a browser, connection, and an account. I also feel it's better for long conversations and
  larger context, since I feel in CLI the long context requires me to start new conversation more often. However, I prefer Claude CLI since I could view Claude and the code
  files all in VSCode. Meanwhile for Web, Claude has to commit it to Github, then I have to clone that repo locally to view changes visually. Claude CLI also feels like it gives me more control and the workflow
  feels smoother for me to execute the code.

7) When would you use micro-iteration + self-review? For what kinds of tasks does this workflow make sense? When would you skip it?
- I would use micro-iteration + self review cycle when I am doing a more complicated feature, awith more edge cases and uncertainties to consider. In this case, slowng down and narrowing down the scope for errors makes
  debugging easier. It prevents me from piling on changes without testing, which avoids bugs from snowballing into a bigger issue. I would skip it if I already knew exactly what I wanted, and it's mostly addressing
  simple CSS styling changes. In that case, I would rather group those changes together and have it be straightfoward, instead of a back and forth review. 
