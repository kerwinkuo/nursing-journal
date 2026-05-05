-- Supabase SQL editor setup for the dementia care recorder.
-- Run this once in your Supabase project before using cloud sync.

create extension if not exists pgcrypto;

create table if not exists public.care_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  record_date date not null,
  payload jsonb not null,
  saved_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, record_date)
);

alter table public.care_records enable row level security;

drop policy if exists "Users can read own care records" on public.care_records;
drop policy if exists "Users can insert own care records" on public.care_records;
drop policy if exists "Users can update own care records" on public.care_records;
drop policy if exists "Users can delete own care records" on public.care_records;

create policy "Users can read own care records"
on public.care_records
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own care records"
on public.care_records
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own care records"
on public.care_records
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own care records"
on public.care_records
for delete
to authenticated
using (auth.uid() = user_id);

create or replace function public.set_care_records_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists care_records_set_updated_at on public.care_records;

create trigger care_records_set_updated_at
before update on public.care_records
for each row
execute function public.set_care_records_updated_at();
