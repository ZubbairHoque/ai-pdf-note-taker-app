import {chatSession} from '@/configs/AIModels';
import {api} from '@/convex/_generated/api';
import {useUser} from '@clerk/nextjs';
import {useAction, useMutation} from 'convex/react';
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Code,
    Download,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    Sparkles,
    Strikethrough,
    TextQuote,
    Underline
} from 'lucide-react';
import {useParams} from 'next/navigation';
import React, {useContext, useEffect} from 'react';
import {toast} from 'sonner';


function EditiorExtension ({editor }: any) {
    const { fileID} = useParams();
  const searchAI = useAction(api.myAction.search);
  const { user } = useUser();

  const onAiClick = async () => {
    toast("AI is getting your answer...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    const result = await searchAI({
      query: selectedText,
      fileID: fileID as string,
    });

    const UnformattedAns = JSON.parse(result);
    let unFormattedAnswer = "";
    UnformattedAns &&
      UnformattedAns.forEach((item: { pageContent: string }) => {
        unFormattedAnswer = unFormattedAnswer + item.pageContent;
      });

    const PROMPT = `For the question: "${selectedText}", provide an appropriate answer in HTML format using the given content: "${unFormattedAnswer}". Ensure the answer is well-structured and formatted correctly in HTML. If the answer is not available in the provided PDF, search for the answer externally and return it in HTML format. Additionally, clearly mention that the answer was not available in the PDF. Do not include the question itself and Don't add Any heading.Underline or Bold or italic or Highlight the text which is very important based on the question.`;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    const FinalAns = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");

    const AllText = editor.getHTML();
    editor.commands.setContent(
      AllText + '<p><strong> Answer: </strong>' + FinalAns + "</p>"
    );
    
  };

    
    return editor && (
        <div className="p-5 ">
            <div className="control-group">
                <div className="button-group flex gap-3">
                    <button
                        onClick={() => editor.chain ().focus ().toggleHeading ({level : 1}).run ()}
                        className={editor.isActive ('heading', {level : 1}) ? 'text-blue-500' : ''}
                    >
                        <Heading1/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleHeading ({level : 2}).run ()}
                        className={editor.isActive ('heading', {level : 2}) ? 'text-blue-500' : ''}
                    >
                        <Heading2/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleHeading ({level : 3}).run ()}
                        className={editor.isActive ('heading', {level : 3}) ? 'text-blue-500' : ''}
                    >
                        <Heading3/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleBold ().run ()}
                        className={editor.isActive ('bold') ? 'text-blue-500' : ''}
                    >
                        <Bold/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleItalic ().run ()}
                        className={editor.isActive ('italic') ? 'text-blue-500' : ''}
                    >
                        <Italic/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleUnderline ().run ()}
                        className={editor.isActive ('underline') ? 'text-blue-500' : ''}
                    >
                        <Underline/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleCode ().run ()}
                        className={editor.isActive ('code') ? 'text-blue-500' : ''}
                    >
                        <Code/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleBulletList ().run ()}
                        className={editor.isActive ('bulletList') ? 'text-blue-500' : ''}
                    >
                        <List/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleBlockquote ().run ()}
                        className={editor.isActive ('blockquote') ? 'text-blue-500' : ''}
                    >
                        <TextQuote/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ()?.toggleHighlight ().run ()}
                        className={editor.isActive ('highlight') ? 'text-blue-500' : ''}
                    >
                        <Highlighter/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().toggleStrike ().run ()}
                        className={editor.isActive ('strike') ? 'text-blue-500' : ''}
                    >
                        <Strikethrough/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().setTextAlign ('left').run ()}
                        className={editor.isActive ({textAlign : 'left'}) ? 'text-blue-500' : ''}
                    >
                        <AlignLeft/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().setTextAlign ('center').run ()}
                        className={editor.isActive ({textAlign : 'center'}) ? 'text-blue-500' : ''}
                    >
                        <AlignCenter/>
                    </button>
                    <button
                        onClick={() => editor.chain ().focus ().setTextAlign ('right').run ()}
                        className={editor.isActive ({textAlign : 'right'}) ? 'text-blue-500' : ''}
                    >
                        <AlignRight/>
                    </button>
                    
                    <button
                        onClick={() => onAiClick ()}
                        className={'hover:text-blue-500'}
                    >
                        <Sparkles/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditiorExtension;