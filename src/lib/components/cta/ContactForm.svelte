<!-- $lib/components/ContactForm.svelte -->
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Mail, Phone, Copy, Check } from "lucide-svelte";

  interface ContactFormProps {
    textSize?: string;
  }

  export let textSize: ContactFormProps['textSize'] = 'text-sm';

  let email = "hanaramujkic1@gmail.com";
  let phone = "+43 677 64 3151 64";
  let copiedEmail = false;
  let copiedPhone = false;

  async function copyToClipboard(text: string, type: 'email' | 'phone') {
    await navigator.clipboard.writeText(text);
    if (type === 'email') copiedEmail = true;
    if (type === 'phone') copiedPhone = true;
    
    setTimeout(() => {
      if (type === 'email') copiedEmail = false;
      if (type === 'phone') copiedPhone = false;
    }, 2000);
  }

  function getWhatsAppLink(phoneNumber: string) {
    return `https://wa.me/${phoneNumber.replace(/\s+/g, '')}`;
  }
</script>

<div class="flex flex-col gap-4 w-full">
  <div class="flex items-center w-full group p-3 rounded-lg transition-colors hover:bg-foreground/5">
    <Mail class="h-6 w-6 mr-4 text-foreground/20" />
    <a href="mailto:{email}" class="flex-grow">
      <span class="{textSize} text-foreground/90 hover:text-foreground transition-colors">
        {email}
      </span>
    </a>
    <Button 
      variant="ghost" 
      size="icon" 
      class="h-8 w-8 ml-2 text-foreground/60 hover:text-foreground/90 hover:bg-foreground/10"
      on:click={() => copyToClipboard(email, 'email')}
    >
      {#if copiedEmail}
        <Check class="h-4 w-4 text-emerald-400" />
      {:else}
        <Copy class="h-4 w-4" />
      {/if}
    </Button>
  </div>

  <div class="flex items-center w-full group p-3 rounded-lg transition-colors hover:bg-foreground/5">
    <Phone class="h-6 w-6 mr-4 text-foreground/30" />
    <a 
      href={getWhatsAppLink(phone)} 
      target="_blank" 
      rel="noopener noreferrer" 
      class="flex-grow"
    >
      <span class="{textSize} text-foreground/90 hover:text-foreground transition-colors">
        {phone}
      </span>
    </a>
    <Button 
      variant="ghost" 
      size="icon"
      class="h-8 w-8 ml-2 text-foreground/60 hover:text-foreground/90 hover:bg-foreground/10"
      on:click={() => copyToClipboard(phone, 'phone')}
    >
      {#if copiedPhone}
        <Check class="h-4 w-4 text-emerald-400" />
      {:else}
        <Copy class="h-4 w-4" />
      {/if}
    </Button>
  </div>
</div>