import React, { useState } from 'react';
import { Box, Typography, List, ListItem, TextField, IconButton, Button } from '@mui/material';
import { Send, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../store/slices/recipeSlice';

export default function CommentSection({ recipeId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.recipes.comments[String(recipeId)] || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentInputRef, setCommentInputRef] = useState(null);

  const handleAddComment = () => {
    if (newCommentText.trim() === '') return;
    dispatch(addComment({ recipeId: String(recipeId), text: newCommentText }));
    setNewCommentText('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    if (commentInputRef) {
      const input = commentInputRef;
      const start = input.selectionStart ?? newCommentText.length;
      const end = input.selectionEnd ?? newCommentText.length;
      const newText = newCommentText.slice(0, start) + emojiObject.emoji + newCommentText.slice(end);
      setNewCommentText(newText);
      setTimeout(() => {
        input.focus();
        const pos = start + emojiObject.emoji.length;
        input.selectionStart = input.selectionEnd = pos;
      }, 0);
    } else {
      setNewCommentText(prev => prev + emojiObject.emoji);
    }
  };

  return (
    <Box sx={{ mt: 6, bgcolor: 'white', p: { xs: 3, md: 4 }, borderRadius: 3, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
      <Typography variant="h6" sx={{ color: '#2D5016', fontWeight: 700, mb: 3 }}>
        Comments ({comments.length})
      </Typography>

      {comments.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'rgba(45, 80, 22, 0.6)', mb: 3 }}>
          No comments yet. Be the first to leave one!
        </Typography>
      ) : (
        <List sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                flexDirection: 'column', alignItems: 'flex-start', py: 1.5, px: 2,
                bgcolor: '#F0EAD6', borderRadius: 2, boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 0.5, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2D5016' }}>{comment.author}</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(45, 80, 22, 0.6)' }}>{comment.date}</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#2D5016', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{comment.text}</Typography>
            </ListItem>
          ))}
        </List>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" sx={{ color: '#2D5016', fontWeight: 600 }}>Leave a Comment</Typography>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            label="Your Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newCommentText}
            inputRef={ref => setCommentInputRef(ref)}
            onChange={e => setNewCommentText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleAddComment(); }}
            placeholder="Share your thoughts... (Ctrl+Enter to post)"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2, backgroundColor: '#F9F9F9',
                '&:hover fieldset': { borderColor: '#FF6B35' },
                '&.Mui-focused fieldset': { borderColor: '#FF6B35', borderWidth: '2px' },
              },
              '& .MuiInputLabel-root': { color: '#2D5016' },
            }}
          />
          <IconButton
            onClick={() => setShowEmojiPicker(v => !v)}
            sx={{ position: 'absolute', bottom: 12, right: 12, bgcolor: '#fff', boxShadow: 1, zIndex: 2, '&:hover': { bgcolor: '#F0F0F0' } }}
            aria-label="emoji picker"
          >
            <Smile size={22} />
          </IconButton>
          {showEmojiPicker && (
            <Box sx={{ position: 'absolute', bottom: 60, right: 0, zIndex: 10, boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" width={320} height={380} />
            </Box>
          )}
        </Box>
        <Button
          variant="contained"
          endIcon={<Send size={20} />}
          onClick={handleAddComment}
          disabled={!newCommentText.trim()}
          sx={{ bgcolor: '#FF6B35', color: 'white', fontWeight: 600, py: 1.5, borderRadius: 2, '&:hover': { bgcolor: '#FF5722' }, '&:disabled': { bgcolor: '#ccc' } }}
        >
          Post Comment
        </Button>
      </Box>
    </Box>
  );
}
