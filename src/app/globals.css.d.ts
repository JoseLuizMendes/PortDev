/**
 * Sistema de Cores do Projeto - Paleta Personalizada
 * 
 * Este arquivo documenta as variáveis CSS customizadas usadas no projeto.
 * As cores são organizadas de forma semântica para facilitar a manutenção.
 * 
 * CORES PRINCIPAIS DO PROJETO:
 * --primary-blue: #3b82f6        - Azul principal usado em elementos interativos
 * --primary-blue-dark: #1e40af   - Azul escuro para estados hover/active
 * --primary-blue-light: #60a5fa  - Azul claro para destaques
 * --primary-purple: #8b5cf6      - Roxo para gradientes e acentos
 * --primary-cyan: #06b6d4        - Ciano para gradientes
 * 
 * TEMA CLARO (:root):
 * --background: #ffffff          - Fundo branco da página
 * --foreground: #0f172a          - Texto principal escuro
 * --card: #1e3a5f                - Fundo azul dos cards (mantido em ambos os temas)
 * --card-foreground: #f1f5f9     - Texto dos cards (claro)
 * --primary: var(--primary-blue) - Cor primária (azul)
 * --secondary: #e2e8f0           - Cor secundária (cinza claro)
 * --muted: #f1f5f9               - Fundo mutado
 * --muted-foreground: #64748b    - Texto mutado
 * 
 * TEMA ESCURO (.dark):
 * --background: #0f172a          - Fundo escuro da página
 * --foreground: #f1f5f9          - Texto principal claro
 * --card: #1e3a5f                - Fundo azul dos cards (mantido em ambos os temas)
 * --card-foreground: #f1f5f9     - Texto dos cards (claro)
 * --primary: var(--primary-blue) - Cor primária (azul)
 * --secondary: #1e293b           - Cor secundária (cinza escuro)
 * --muted: #334155               - Fundo mutado
 * --muted-foreground: #94a3b8    - Texto mutado
 * 
 * NOTAS IMPORTANTES:
 * 1. Os cards mantêm a cor azul (#1e3a5f) em AMBOS os temas
 * 2. Apenas o fundo da página (--background) muda entre os temas
 * 3. Use as variáveis CSS ao invés de cores hardcoded para facilitar ajustes
 * 4. Classes utilitárias como .glass-card, .text-gradient, etc. usam essas variáveis
 * 
 * CLASSES UTILITÁRIAS PERSONALIZADAS:
 * .glass-card           - Cards com efeito glassmorphism (fundo azul)
 * .text-gradient        - Texto com gradiente azul-roxo
 * .gradient-tech        - Gradiente de fundo azul-roxo
 * .gradient-tech-border - Gradiente de borda com 3 cores
 * .tech-hover           - Efeito hover para elementos interativos
 * .pulse-tech           - Animação de pulse com sombra azul
 */

export {};
