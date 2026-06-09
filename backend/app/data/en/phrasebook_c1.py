"""English phrasebook — C1 categories."""

from app.data._types import PhrasebookCategory, PhrasebookEntry

C1_CATEGORIES: list[PhrasebookCategory] = [
    PhrasebookCategory(
        id="presentations_c1",
        level="C1",
        situation="Presentations & Public Speaking",
        icon="\U0001f3a4",
        phrases=[
            PhrasebookEntry(
                text="Today I'd like to talk to you about...",
                context="Opening a presentation",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'll begin by outlining the key issues, then move on to...",
                context="Signposting the structure",
                register="formal",
            ),
            PhrasebookEntry(
                text="As you can see from this slide, ...",
                context="Referring to a visual aid",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'd like to draw your attention to...",
                context="Highlighting an important point",
                register="formal",
            ),
            PhrasebookEntry(
                text="Building on this point, ...",
                context="Developing an argument",
                register="formal",
            ),
            PhrasebookEntry(
                text="This brings me to my next point, which is...",
                context="Transitioning between sections",
                register="formal",
            ),
            PhrasebookEntry(
                text="What this essentially means is that...",
                context="Clarifying a complex idea",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'd like to take a step back and consider...",
                context="Broadening the perspective",
                register="formal",
            ),
            PhrasebookEntry(
                text="The data clearly indicates that...",
                context="Interpreting data",
                register="formal",
            ),
            PhrasebookEntry(
                text="To put it another way, ...",
                context="Rephrasing for clarity",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'm happy to take questions at the end.",
                context="Managing Q&A",
                register="formal",
            ),
            PhrasebookEntry(
                text="That's a very pertinent question.",
                context="Acknowledging a good question",
                register="formal",
            ),
            PhrasebookEntry(
                text="To summarise the key takeaways, ...",
                context="Closing the presentation",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="complex_arguments_c1",
        level="C1",
        situation="Complex Arguments & Critical Thinking",
        icon="\U0001f9e0",
        phrases=[
            PhrasebookEntry(
                text="One might argue that..., however the evidence suggests...",
                context="Presenting a counterargument then rebutting",
                register="formal",
            ),
            PhrasebookEntry(
                text="The distinction between X and Y is crucial here.",
                context="Drawing an important distinction",
                register="formal",
            ),
            PhrasebookEntry(
                text="While I take your point, I would contend that...",
                context="Polite disagreement",
                register="formal",
            ),
            PhrasebookEntry(
                text="The issue is more nuanced than it first appears.",
                context="Suggesting complexity",
                register="formal",
            ),
            PhrasebookEntry(
                text="This argument fails to account for...",
                context="Identifying a flaw in reasoning",
                register="formal",
            ),
            PhrasebookEntry(
                text="Correlation does not necessarily imply causation.",
                context="Questioning a causal claim",
                register="formal",
            ),
            PhrasebookEntry(
                text="We should be cautious about generalising from a single case.",
                context="Raising methodological concern",
                register="formal",
            ),
            PhrasebookEntry(
                text="That notwithstanding, the broader trend is clear.",
                context="Acknowledging an exception while maintaining position",
                register="formal",
            ),
            PhrasebookEntry(
                text="The weight of evidence points convincingly to...",
                context="Summarising evidence",
                register="formal",
            ),
            PhrasebookEntry(
                text="I concede that..., but this does not undermine my overall point.",
                context="Partial concession",
                register="formal",
            ),
            PhrasebookEntry(
                text="What is often overlooked in this debate is...",
                context="Introducing a neglected angle",
                register="formal",
            ),
            PhrasebookEntry(
                text="The implications of this are far-reaching.",
                context="Stressing significance",
                register="formal",
            ),
        ],
    ),
    PhrasebookCategory(
        id="professional_networking_c1",
        level="C1",
        situation="Professional Networking",
        icon="\U0001f91d",
        phrases=[
            PhrasebookEntry(
                text="I believe we have some mutual connections.",
                context="Breaking the ice at a professional event",
                register="formal",
            ),
            PhrasebookEntry(
                text="I've been following your work on [topic] \u2014 it's really compelling.",
                context="Opening a conversation with a professional you admire",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'd love to pick your brain about [subject] sometime.",
                context="Proposing an informal knowledge exchange",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Would you be open to a brief call to explore potential synergies?",
                context="Suggesting a follow-up meeting",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'm currently working on [project] \u2014 it might align with what you're doing.",
                context="Finding common ground",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Could I connect you with [Name]? I think you'd have a lot to discuss.",
                context="Making an introduction",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'd be happy to share some resources on that if it would be useful.",
                context="Offering to help",
                register="neutral",
            ),
            PhrasebookEntry(
                text="It was a pleasure speaking with you \u2014 let's stay in touch.",
                context="Closing a networking conversation",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'll send you a LinkedIn request so we can keep the conversation going.",
                context="Following up after meeting",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Do you have a card, or shall I find you on LinkedIn?",
                context="Exchanging contact details",
                register="neutral",
            ),
        ],
    ),
    PhrasebookCategory(
        id="conflict_resolution_c1",
        level="C1",
        situation="Conflict Resolution",
        icon="\U0001f54a\ufe0f",
        phrases=[
            PhrasebookEntry(
                text="I sense there may be some tension around this issue \u2014 shall we address it openly?",
                context="Naming a conflict and inviting dialogue",
                register="formal",
            ),
            PhrasebookEntry(
                text="I understand this is a difficult situation for all parties involved.",
                context="Showing empathy before discussing solutions",
                register="formal",
            ),
            PhrasebookEntry(
                text="I'd like to hear your perspective before I share mine.",
                context="Demonstrating willingness to listen",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I think there may have been a misunderstanding \u2014 let me clarify my position.",
                context="Addressing a miscommunication",
                register="neutral",
            ),
            PhrasebookEntry(
                text="Our goal should be to find a solution that works for everyone.",
                context="Refocusing on shared interests",
                register="neutral",
            ),
            PhrasebookEntry(
                text="I'm willing to reconsider my stance if you can walk me through your reasoning.",
                context="Showing openness to compromise",
                register="formal",
            ),
            PhrasebookEntry(
                text="Could we agree to set this point aside for now and return to it later?",
                context="De-escalating a heated point",
                register="formal",
            ),
            PhrasebookEntry(
                text="I want to be direct without being dismissive of your concerns.",
                context="Balancing honesty with respect",
                register="neutral",
            ),
            PhrasebookEntry(
                text="What would a satisfactory outcome look like from your perspective?",
                context="Inviting the other party to define success",
                register="formal",
            ),
            PhrasebookEntry(
                text="I think we're closer to agreement than it might appear.",
                context="Building bridges at a tense moment",
                register="neutral",
            ),
        ],
    ),
]
