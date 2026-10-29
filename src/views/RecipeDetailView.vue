<template>
  <div v-if="recipe" class="detail-container">
    <button @click="$emit('back')" class="btn-back">
      ← Volver al catálogo
    </button>

    <h2>{{ recipe.title }}</h2>

    <p class="meta">
      <span><strong>Categoría:</strong> {{ recipe.category }}</span> |
      <span><strong>Tiempo:</strong> {{ recipe.time }} mins</span> |
      <span><strong>Dificultad:</strong> {{ recipe.difficulty }}</span>
    </p>

    <p class="description">{{ recipe.description }}</p>

    <div v-if="recipe.image" class="image-container">
      <img
        :src="recipe.image"
        :alt="recipe.title"
        class="recipe-image"
      />
    </div>

    <div class="content-grid">
      <div class="ingredients-box">
        <h3>Ingredientes</h3>

        <ul>
          <li
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>

      <div class="steps-box">
        <h3>Pasos de preparación</h3>

        <ol>
          <li
            v-for="(step, index) in recipe.steps"
            :key="index"
          >
            {{ step }}
          </li>
        </ol>
      </div>
    </div>

    <section class="community-section">
      <h3>Calificación</h3>

      <div class="rating-summary">
        <strong>
          {{ ratingSummary.average || 'Sin calificación' }}
        </strong>

        <span v-if="ratingSummary.total > 0">
          de 5, con {{ ratingSummary.total }}
          {{ ratingSummary.total === 1 ? 'voto' : 'votos' }}
        </span>
      </div>

      <div class="stars" aria-label="Calificar receta">
        <button
          v-for="star in 5"
          :key="star"
          type="button"
          class="star-button"
          :class="{ selected: star <= selectedRating }"
          :title="`${star} estrellas`"
          @click="submitRating(star)"
        >
          ★
        </button>
      </div>

      <p v-if="!authService.isAuthenticated.value" class="info">
        Inicia sesión para calificar esta receta.
      </p>

      <p v-if="ratingMessage" class="success">
        {{ ratingMessage }}
      </p>

      <p v-if="ratingError" class="error">
        {{ ratingError }}
      </p>
    </section>

    <section class="community-section">
      <h3>Comentarios y reseñas</h3>

      <form
        v-if="authService.isAuthenticated.value"
        @submit.prevent="submitComment"
      >
        <textarea
          v-model="newComment"
          maxlength="500"
          rows="3"
          placeholder="Escribe tu comentario sobre esta receta"
          required
        ></textarea>

        <div class="comment-actions">
          <small>{{ newComment.length }}/500</small>

          <button type="submit" class="btn-submit">
            Publicar comentario
          </button>
        </div>
      </form>

      <p v-else class="info">
        Inicia sesión para publicar un comentario.
      </p>

      <p v-if="commentError" class="error">
        {{ commentError }}
      </p>

      <div v-if="recipe.comments.length" class="comments-list">
        <article
          v-for="comment in recipe.comments"
          :key="comment.id"
          class="comment-card"
        >
          <div class="comment-header">
            <strong>{{ comment.userName }}</strong>

            <small>{{ formatDate(comment.createdAt) }}</small>
          </div>

          <p>{{ comment.text }}</p>

          <button
            v-if="canDeleteComment(comment)"
            type="button"
            class="btn-delete-comment"
            @click="deleteComment(comment.id)"
          >
            Eliminar
          </button>
        </article>
      </div>

      <p v-else class="empty-comments">
        Esta receta todavía no tiene comentarios.
      </p>
    </section>
  </div>

  <div v-else class="detail-container">
    <p>Selecciona una receta para ver sus detalles.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { authService } from '../services/authService';
import { recipeService } from '../services/recipeService';

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
});

defineEmits(['back']);

const newComment = ref('');
const commentError = ref('');
const ratingError = ref('');
const ratingMessage = ref('');
const selectedRating = ref(0);

const ratingSummary = computed(() =>
  recipeService.getRatingSummary(props.recipe.id)
);

const loadUserRating = () => {
  selectedRating.value = recipeService.getUserRating(
    props.recipe.id
  );
};

watch(
  () => props.recipe.id,
  loadUserRating,
  { immediate: true }
);

const submitComment = () => {
  commentError.value = '';

  try {
    recipeService.addComment(
      props.recipe.id,
      newComment.value
    );

    newComment.value = '';
  } catch (error) {
    commentError.value = error.message;
  }
};

const deleteComment = (commentId) => {
  commentError.value = '';

  if (!confirm('¿Deseas eliminar este comentario?')) {
    return;
  }

  try {
    recipeService.deleteComment(
      props.recipe.id,
      commentId
    );
  } catch (error) {
    commentError.value = error.message;
  }
};

const submitRating = (score) => {
  ratingError.value = '';
  ratingMessage.value = '';

  try {
    recipeService.rateRecipe(props.recipe.id, score);
    selectedRating.value = score;
    ratingMessage.value = 'Tu calificación fue guardada.';
  } catch (error) {
    ratingError.value = error.message;
  }
};

const canDeleteComment = (comment) =>
  authService.currentUser.value?.id === comment.userId;

const formatDate = (date) =>
  new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date));
</script>

<style scoped>
.detail-container {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.btn-back {
  background: none;
  border: none;
  color: #0284c7;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 1rem;
}

.meta {
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 1rem;
}

.description {
  font-style: italic;
  color: #334155;
  margin-bottom: 1.5rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
}

.ingredients-box,
.steps-box {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
}

ul,
ol {
  padding-left: 1.2rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.image-container {
  margin-bottom: 1.5rem;
  text-align: center;
}

.recipe-image {
  max-width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.community-section {
  margin-top: 1.5rem;
  padding: 1.2rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.rating-summary {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: #475569;
}

.stars {
  display: flex;
  gap: 0.25rem;
  margin: 0.8rem 0;
}

.star-button {
  padding: 0;
  border: none;
  background: transparent;
  color: #cbd5e1;
  font-size: 2rem;
  cursor: pointer;
}

.star-button.selected {
  color: #f59e0b;
}

textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  resize: vertical;
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.btn-submit {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  background: #16a34a;
  color: white;
  cursor: pointer;
}

.comments-list {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
}

.comment-card {
  padding: 0.8rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn-delete-comment {
  border: none;
  background: transparent;
  color: #dc2626;
  cursor: pointer;
  padding: 0;
}

.info {
  color: #475569;
}

.success {
  color: #15803d;
}

.error {
  color: #b91c1c;
}

.empty-comments {
  color: #64748b;
  font-style: italic;
}

@media (max-width: 600px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .comment-header {
    flex-direction: column;
    gap: 0.2rem;
  }
}
</style>