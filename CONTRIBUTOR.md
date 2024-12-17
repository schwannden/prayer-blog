# Contributor Guide

Welcome to the Prayer Blog project! We appreciate your interest in contributing. This guide outlines the process for contributing both as a developer and as a non-developer.

---

## Developer Contribution Guide

### 1. Contribution Process

To contribute as a developer:

1. **Fork the Repository**: Start by forking the repository to your own GitHub account.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/<your-username>/prayer-blog.git
   cd prayer-blog
   ```
3. **Create a Branch**:

   - Use the following naming convention for your branch:
     ```
     <type>/<short-description>
     ```
     For example:
     - `feat/add-new-prayer-page`
     - `fix/prayer-edit-bug`

   ```bash
   git checkout -b feat/your-feature-name
   ```

4. **Commit Changes**: Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines:

   ```
   <type>: <short summary>
   ```

   Examples:

   - `feat: add new prayer entry feature`
   - `fix: resolve bug in edit prayer form`

   **Conventional Commit Types**:

   - `feat`: A new feature.
   - `fix`: A bug fix.
   - `docs`: Documentation changes.
   - Refer to [release please config](https://github.com/schwannden/prayer-blog/blob/main/release-please-config.json#L12) for more types.

5. **Push Your Changes**:

   ```bash
   git push origin feat/your-feature-name
   ```

6. **Create a Pull Request (PR)**:
   - Go to the original repository: [Prayer Blog](https://github.com/schwannden/prayer-blog)
   - Click "New Pull Request".
   - Provide a clear description of your changes.

---

## Non-Developer Contribution Guide

If you aren't coding but still want to help, please contribute by reporting issues or suggesting ideas!

1. **Go to Issues**:

   - Navigate to the [Issues Tab](https://github.com/schwannden/prayer-blog/issues).
   - Search for existing issues or [create a new one](https://github.com/schwannden/prayer-blog/issues/new/choose).

2. **Create a New Issue**:

   - Select the appropriate issue type:

     - 🐛 **Bug Report**: Report any bugs or unexpected behavior.
     - ✨ **Feature Request**: Suggest a new feature or improvement.
     - 🙏 **New Prayer Contribution**: Share new prayers to be added to the blog.

   - Fill out the issue template clearly and provide as much detail as possible.

---

Thank you for helping make the Prayer Blog better! 🌟
