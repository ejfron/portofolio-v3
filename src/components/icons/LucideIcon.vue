<script setup lang="ts">
import { computed } from 'vue'
import {
  Webhook,
  MonitorSmartphone,
  Droplet,
  Store,
  FileText,
  Globe,
  MapPin,
  Mail,
  Code,
  Clock,
  Info,
  GraduationCap,
  Sun, 
  Moon, 
  X,
  Image,
  Send,
  MessageSquare,
  PenLine,
  VolumeX,
  Volume1,
  Eye,
  AlertCircle,
  Home,
  User,
  Layers,
  FolderKanban,
  Phone,
  Lightbulb,
  BookOpen,
  Users,
  Download,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Quote,
  Menu,
  ExternalLink,
  CheckCircle2,
} from '@lucide/vue'

const icons = {
  Webhook,
  MonitorSmartphone,
  Droplet,
  Store,
  FileText,

  Globe,
  MapPin,
  Mail,
  Code,
  Clock,
  Info,
  GraduationCap,
  Sun,   
  Moon, 
  X,
  Image,
  Send,
  MessageSquare,
  PenLine,
  VolumeX,
  Volume1,
  Eye,
  AlertCircle,
  Home,
  User,
  Layers,
  FolderKanban,
  Phone,
  Lightbulb,
  BookOpen,
  Users,
  Download,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Quote,
  Menu,
  ExternalLink,
  CheckCircle2,
} as const

export type LucideIconName = keyof typeof icons

const props = defineProps<{
  name: LucideIconName
  size?: number 
  strokeWidth?: number
}>()

const icon = computed(() => icons[props.name] ?? Code)
</script>

<template>
  <component :is="icon" :size="size ?? 18" :stroke-width="strokeWidth ?? 2" />
</template>