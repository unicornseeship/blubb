<script lang="ts">
	import Button from 'components/Button.svelte';
	import Stack from 'components/Stack.svelte';
	import Hero from 'components/Hero/Hero.svelte';
	import Page from 'components/Page.svelte';
	import Footer from 'components/Footer.svelte';
	import Heading from 'components/Heading.svelte';

	import { page } from '$app/state';

	let coursesFs = page.data.coursesFs;
</script>

<svelte:head>
	<title>LibreLingo - learn a language for free</title>
	<meta
		name="description"
		content="LibreLingo is an experiment to create a community driven language-learning platform. Learn a language for free."
	/>
</svelte:head>

<main class="main-content app-page">
	<Page>
		<Hero>
			<Stack direction="column" spacing="m" fullHeight justify="center">
				<Stack spacing="m" direction="column" directionDesktop="row">
					<Stack shrink={0}>
						<img
							src="/images/LibreLingoRelive_transparent.png"
							alt="LibreLingo"
							class="home-logo"
						/>
					</Stack>
					<Stack direction="column" justify="center">
						<Heading level={1}>
							<span>a community-driven</span>
							<br />
							<span>language-learning platform</span>
						</Heading>
					</Stack>
				</Stack>

				<Stack spacing="m" direction="column">
					{#if coursesFs}
						{#each coursesFs as course (course.path)}
							<Stack justify="center">
								<Button style="primary" size="large" href={`/course/${course.path}`}>
									Start learning {course.language}
								</Button>
							</Stack>
						{/each}
					{/if}
				</Stack>
			</Stack>
		</Hero>
		<Footer />
	</Page>
</main>

<style>
	.home-logo {
		display: block;
		width: 280px;
		max-width: 100%;
		max-height: 360px;
		flex-shrink: 0;
		object-fit: contain;
	}
</style>
